import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action) {
      const { chatId, message } = action.payload;
      if (!state.chats[chatId]) {
        state.chats[chatId] = [];
      }
      state.chats[chatId].push(message);
    },
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
