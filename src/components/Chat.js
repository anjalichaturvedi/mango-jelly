import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography, IconButton, useTheme } from '@mui/material';
import { Send, EmojiEmotions, ThumbUp, Favorite } from '@mui/icons-material';
import { sendMessage, addReaction } from '../features/chat/chatSlice';
import EmojiPicker from 'emoji-picker-react';
import TypingIndicator from './TypingIndicator';

const Chat = ({ darkMode }) => {
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  const handleSend = () => {
    if (input.trim()) {
      dispatch(sendMessage(input));
      setInput('');
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        dispatch(sendMessage('Thanks for your message!', { id: 2, name: 'Bot' }));
      }, Math.random() * 2000 + 1000);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setInput(prevInput => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleReaction = (messageId, reaction) => {
    dispatch(addReaction({ messageId, reaction }));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 600, margin: 'auto', bgcolor: darkMode ? 'grey.900' : 'background.default' }}>
      <List sx={{ flexGrow: 1, overflow: 'auto', padding: 2 }}>
        {messages.map((message) => (
          <ListItem key={message.id} sx={{ flexDirection: 'column', alignItems: message.sender.id === 1 ? 'flex-end' : 'flex-start' }}>
            <Typography variant="caption" sx={{ mb: 1, color: darkMode ? 'grey.500' : 'text.secondary' }}>
              {message.sender.name} - {new Date(message.timestamp).toLocaleTimeString()}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: message.sender.id === 1 ? 'flex-end' : 'flex-start' }}>
              <ListItemText
                primary={message.text}
                sx={{
                  backgroundColor: message.sender.id === 1 ? theme.palette.primary.main : theme.palette.secondary.main,
                  color: theme.palette.getContrastText(message.sender.id === 1 ? theme.palette.primary.main : theme.palette.secondary.main),
                  borderRadius: 2,
                  padding: 1,
                  maxWidth: '80%',
                }}
              />
              <Box sx={{ display: 'flex', mt: 1 }}>
                <IconButton size="small" onClick={() => handleReaction(message.id, 'like')}>
                  <ThumbUp fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleReaction(message.id, 'love')}>
                  <Favorite fontSize="small" />
                </IconButton>
                {message.reactions && (
                  <Typography variant="caption" sx={{ ml: 1 }}>
                    {Object.entries(message.reactions).map(([reaction, count]) => `${reaction}: ${count}`).join(', ')}
                  </Typography>
                )}
              </Box>
            </Box>
          </ListItem>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </List>
      <Box sx={{ display: 'flex', padding: 2, bgcolor: darkMode ? 'grey.800' : 'grey.100' }}>
        <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <EmojiEmotions />
        </IconButton>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          sx={{ mr: 1, bgcolor: darkMode ? 'grey.900' : 'background.paper' }}
        />
        <Button variant="contained" onClick={handleSend} endIcon={<Send />}>
          Send
        </Button>
      </Box>
      {showEmojiPicker && (
        <Box sx={{ position: 'absolute', bottom: 80, right: 20 }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </Box>
      )}
    </Box>
  );
};

export default Chat;