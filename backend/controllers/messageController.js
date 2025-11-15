const { Message, Conversation } = require('../models/Message');

// @desc    Get user's conversations
// @route   GET /api/messages/conversations
// @access  Private
exports.getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id
    })
    .populate('participants', 'fullName profileImage')
    .populate('lastMessage')
    .populate('booking', 'service status')
    .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: conversations.length,
      data: conversations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single conversation
// @route   GET /api/messages/conversations/:id
// @access  Private
exports.getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate('participants', 'fullName profileImage')
      .populate('booking', 'service status');

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    // Check if user is participant
    if (!conversation.participants.some(p => p._id.toString() === req.user.id)) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this conversation'
      });
    }

    res.status(200).json({
      success: true,
      data: conversation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new conversation
// @route   POST /api/messages/conversations
// @access  Private
exports.createConversation = async (req, res, next) => {
  try {
    const { participantId, bookingId } = req.body;

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user.id, participantId] }
    });

    if (conversation) {
      return res.status(200).json({
        success: true,
        data: conversation
      });
    }

    // Create new conversation
    conversation = await Conversation.create({
      participants: [req.user.id, participantId],
      booking: bookingId
    });

    conversation = await conversation.populate('participants', 'fullName profileImage');

    res.status(201).json({
      success: true,
      data: conversation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get messages in a conversation
// @route   GET /api/messages/conversations/:id/messages
// @access  Private
exports.getMessages = async (req, res, next) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    // Check if user is participant
    if (!conversation.participants.some(p => p.toString() === req.user.id)) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access these messages'
      });
    }

    const messages = await Message.find({ conversation: req.params.id })
      .populate('sender', 'fullName profileImage')
      .populate('receiver', 'fullName profileImage')
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send message
// @route   POST /api/messages/conversations/:id/messages
// @access  Private
exports.sendMessage = async (req, res, next) => {
  try {
    const { messageType, content, receiverId } = req.body;

    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    // Check if user is participant
    if (!conversation.participants.some(p => p.toString() === req.user.id)) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to send messages in this conversation'
      });
    }

    const message = await Message.create({
      conversation: req.params.id,
      sender: req.user.id,
      receiver: receiverId,
      messageType,
      content
    });

    // Update conversation's last message
    conversation.lastMessage = message._id;
    conversation.updatedAt = Date.now();
    await conversation.save();

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'fullName profileImage')
      .populate('receiver', 'fullName profileImage');

    res.status(201).json({
      success: true,
      data: populatedMessage
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private
exports.markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Only receiver can mark as read
    if (message.receiver.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this message'
      });
    }

    message.isRead = true;
    message.readAt = Date.now();
    await message.save();

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
};
