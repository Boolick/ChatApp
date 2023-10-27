import { createSlice } from "@redux/toolkit";

const initialState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export const { adMessage } = chatSlice.actions;

export default chatSlice.reducer;
