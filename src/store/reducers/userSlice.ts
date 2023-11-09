import { createSlice } from "@reduxjs/toolkit";

export interface User {
  idInstance: number;
  apiTokenInstance: string;
  phoneNumber: number | null;
  currentUser: string;
  message: string;
}

const initialState: User = {
  idInstance: 0,
  apiTokenInstance: "",
  phoneNumber: null,
  currentUser: "",
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIdInstance(state, action) {
      state.idInstance = action.payload;
    },
    setApiTokenInstance(state, action) {
      state.apiTokenInstance = action.payload;
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const {
  setIdInstance,
  setApiTokenInstance,
  setPhoneNumber,
  setCurrentUser,
} = userSlice.actions;

export default userSlice.reducer;
