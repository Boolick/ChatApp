import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./api/apiSlice";
import chatReducer from "./reducers/chatReducer";
import userReducer from "./reducers/userSlice";

 const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    chat: chatReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(apiSlice.middleware),
});

export interface User {
  idInstance: number;
  apiTokenInstance: string;
  phoneNumber: number;
}

export interface RootState {
  user: User;
   
}

export default store;