import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../store/reducers/chatReducer";

function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    dispatch(addMessage(newMessage));
    setNewMessage("");
  };
  return (
    <div>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default Chat;
