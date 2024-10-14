// src/features/index.js
import { chatSlice } from './chat/chatSlice';

export const { sendMessage, receiveMessage } = chatSlice.actions;
export { default as chatReducer } from './chat/chatSlice';