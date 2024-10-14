// src/components/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { sendMessage, receiveMessage } from '../features/chat/chatSlice.js';

const Chat = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      dispatch(sendMessage(input));
      setInput('');
      
      // Simulate receiving a message after 1 second
      setTimeout(() => {
        dispatch(receiveMessage('Thanks for your message!'));
      }, 1000);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 600, margin: 'auto' }}>
      <List sx={{ flexGrow: 1, overflow: 'auto', padding: 2 }}>
        {messages.map((message) => (
          <ListItem key={message.id} sx={{ flexDirection: 'column', alignItems: message.sender.id === 1 ? 'flex-end' : 'flex-start' }}>
            <Typography variant="caption" sx={{ mb: 1 }}>
              {message.sender.name} - {new Date(message.timestamp).toLocaleTimeString()}
            </Typography>
            <ListItemText
              primary={message.text}
              sx={{
                backgroundColor: message.sender.id === 1 ? '#e3f2fd' : '#f5f5f5',
                borderRadius: 2,
                padding: 1,
              }}
            />
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </List>
      <Box sx={{ display: 'flex', padding: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button variant="contained" onClick={handleSend} sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;