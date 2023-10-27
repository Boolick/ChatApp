import { combineReducers } from "@reduxjs/toolkit";
import chatReducer from "./chatReducer";

const rootReducer = combineReducers({
  chat: chatReducer,
});

export default rootReducer;
