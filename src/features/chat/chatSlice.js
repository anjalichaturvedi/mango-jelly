import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  currentUser: { id: 1, name: 'User' },
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: {
      reducer(state, action) {
        state.messages.push(action.payload);
      },
      prepare(text, sender = { id: 1, name: 'User' }) {
        return {
          payload: {
            id: Date.now(),
            text,
            sender,
            timestamp: new Date().toISOString(),
            reactions: {},
          },
        };
      },
    },
    addReaction: (state, action) => {
      const { messageId, reaction } = action.payload;
      const message = state.messages.find(msg => msg.id === messageId);
      if (message) {
        if (!message.reactions[reaction]) {
          message.reactions[reaction] = 1;
        } else {
          message.reactions[reaction]++;
        }
      }
    },
  },
});

export const { sendMessage, addReaction } = chatSlice.actions;

export default chatSlice.reducer;