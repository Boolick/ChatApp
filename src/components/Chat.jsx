import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  useSendMessageMutation,
  useLazyReceiveNotificationQuery,
  useDeleteNotificationMutation,
} from "../store/api/apiSlice";
import {
  addIncommingMessage,
  /*  addOutgoingMessage, */
} from "../store/reducers/chatReducer";

function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [newMessage, setNewMessage] = useState("");
  const [receiptId, setReceiptId] = useState(null);
  const [sendMessage] = useSendMessageMutation();
  const [trigger, result] = useLazyReceiveNotificationQuery();
  const [deleteNotification] = useDeleteNotificationMutation();

  useEffect(() => {
    if (result.data) {
      console.log(result?.data.receiptId);
      setReceiptId(result?.data.receiptId);
      if (
        (result?.data.body.typeWebhook === "outgoingAPIMessageReceived" ||
          result?.data.body.typeWebhook === "outgoingMessageReceived") &&
        result?.data.body.messageData &&
        result?.data.body.messageData.extendedTextMessageData
      ) {
        const textMessage =
          result?.data.body.messageData.extendedTextMessageData.text;
        if (!messages.some((message) => message.text === textMessage)) {
          dispatch(addIncommingMessage(textMessage));
        }
      }
    }
  }, [dispatch, result]);

  useEffect(() => {
    if (receiptId) {
      deleteNotification({
        idInstance: 7103858998,
        apiTokenInstance: "d7cb43057842413c9b1ac50f79bf5d316b4f078a52ac4b52bf",
        receiptId,
      });
    }
  }, [receiptId]);

  const handleSendMessage = async () => {
    await sendMessage({
      idInstance: 7103858998,
      apiTokenInstance: "d7cb43057842413c9b1ac50f79bf5d316b4f078a52ac4b52bf",
      chatId: "84359237442@c.us",
      message: newMessage,
    });

    setNewMessage("");
  };

  const handleReceiveMessages = async () => {
    await trigger({
      idInstance: 7103858998,
      apiTokenInstance: "d7cb43057842413c9b1ac50f79bf5d316b4f078a52ac4b52bf",
    });
  };

  return (
    <div>
      {messages.map((message, index) => (
        <p key={index}>{message.text}</p>
      ))}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
      <button onClick={handleReceiveMessages}>receiveNotification</button>
      {/* <button onClick={handleDeleteMessage}>DeleteNotification</button> */}
    </div>
  );
}

export default Chat;
