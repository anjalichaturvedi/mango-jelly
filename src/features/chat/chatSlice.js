// src/features/chat/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  currentUser: { id: 1, name: 'User' },
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        text: action.payload,
        sender: state.currentUser,
        timestamp: new Date().toISOString(),
      });
    },
    receiveMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        text: action.payload,
        sender: { id: 2, name: 'Bot' },
        timestamp: new Date().toISOString(),
      });
    },
  },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;

export default chatSlice.reducer;