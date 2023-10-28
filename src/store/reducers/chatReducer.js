import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addIncommingMessage(state, action) {
      state.messages.push({text:action.payload, isIncomming: true});
    },
    addOutgoingMessage(state, action) {
      state.messages.push({text:action.payload, isIncomming: false});
    },
  },
});

export const { addIncommingMessage, addOutgoingMessage } = chatSlice.actions;

export default chatSlice.reducer;
