/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import LineBreak from './LineBreak';
import AppTextInput from './AppTextInput';
import AppColors from '../utils/AppColors';

const ChatComp = () => {
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello, are you nearby?', time: '5:03 PM', sent: true },
        { id: '2', text: "I'll be there in a few mins", time: '5:05 PM', sent: false },
        { id: '3', text: 'OK, I am waiting at\nVinmark Store', time: '5:07 PM', sent: true },
        { id: '4', text: "Sorry, I'm stuck in traffic.\nPlease give me a moment.", time: '5:33 PM', sent: false },
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (input.trim()) {
            const newMsg = {
                id: Date.now().toString(),
                text: input,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
                sent: true,
            };
            setMessages([...messages, newMsg]);
            setInput('');
        }
    };

    const renderMessage = ({ item }) => (
        <View style={[styles.messageContainer, item.sent ? styles.rightAlign : styles.leftAlign]}>
            <View style={[styles.bubble, item.sent ? styles.sentBubble : styles.receivedBubble]}>
                <Text style={[styles.messageText, { color: item.sent ? '#fff' : '#000' }]}>{item.text}</Text>
            </View>
            <Text style={styles.timeText}>{item.time}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <FlatList
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingHorizontal: responsiveWidth(4) }}
                    ListHeaderComponent={<LineBreak space={2} />}
                    ListFooterComponent={<LineBreak space={2} />}
                />
            </ScrollView>

            {/* Input Box */}
            <View style={styles.inputContainer}>
                <AppTextInput
                    value={input}
                    inputPlaceHolder={'Type a message'}
                    inputWidth={70}
                    borderWidth={-1}
                    containerBg={AppColors.WHITE}
                    onChangeText={(text) => setInput(text)}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Icon name="send" size={22} color="#fff" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChatComp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    messageContainer: {
        marginVertical: responsiveHeight(1),
    },
    rightAlign: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    leftAlign: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    bubble: {
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(4),
        borderRadius: 16,
        maxWidth: responsiveWidth(75),
    },
    sentBubble: {
        backgroundColor: '#33CC99', // green bubble
        borderTopRightRadius: 0,
    },
    receivedBubble: {
        backgroundColor: '#f2f2f2',
        borderTopLeftRadius: 0,
    },
    messageText: {
        fontSize: responsiveFontSize(1.8),
        lineHeight: responsiveHeight(2.5),
    },
    timeText: {
        fontSize: responsiveFontSize(1.4),
        color: '#888',
        marginTop: responsiveHeight(1),
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: '#ddd',
        paddingHorizontal: responsiveWidth(4),
        paddingVertical: responsiveHeight(2),
        backgroundColor: '#EFEFF4',
    },
    sendButton: {
        backgroundColor: '#33CC99',
        marginLeft: responsiveWidth(4),
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
