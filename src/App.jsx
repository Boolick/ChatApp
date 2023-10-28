import { Provider } from "react-redux";

import Chat from "./components/Chat";
import store from "./store/store";
import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <Chat />
      </Provider>
    </>
  );
}

export default App;
