import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./api/apiSlice";
import chatReducer from "./reducers/chatReducer";

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(apiSlice.middleware),
});
