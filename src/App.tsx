import React from "react";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Chat from "./pages/Chat";
import store from "./store/store";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
