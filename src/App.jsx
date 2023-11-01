import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Chat from "./components/Chat";
import store from "./store/store";
import LoginPage from "./pages/LoginPage";
import "./App.css";

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
