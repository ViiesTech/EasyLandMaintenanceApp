const express = require('express');
const router = express.Router();
const {
  getConversations,
  getConversation,
  createConversation,
  getMessages,
  sendMessage,
  markAsRead
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/conversations')
  .get(getConversations)
  .post(createConversation);

router.get('/conversations/:id', getConversation);
router.get('/conversations/:id/messages', getMessages);
router.post('/conversations/:id/messages', sendMessage);
router.put('/messages/:id/read', markAsRead);

module.exports = router;
