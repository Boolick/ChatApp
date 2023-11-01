import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  useSendMessageMutation,
  useLazyReceiveNotificationQuery,
  useDeleteNotificationMutation,
} from "../store/api/apiSlice";

import { addMessage } from "../store/reducers/chatReducer";
import { MessageBox } from "./styles";
import Sidebar from "./Sidebar";

function Chat() {
  const dispatch = useDispatch();
  const [activeChatId, setActiveChatId] = useState(null);
  const messages = useSelector((state) => state.chat.chats[activeChatId] || []);
  const [newMessage, setNewMessage] = useState("");
  const [receiptId, setReceiptId] = useState(null);
  const [sendMessage] = useSendMessageMutation();
  const [trigger, result] = useLazyReceiveNotificationQuery();
  const [deleteNotification] = useDeleteNotificationMutation();
  const { phoneNumber, idInstance, apiTokenInstance } = useSelector(
    (state) => state.user
  ); /* "84359237442@c.us"; */
  const chatId = `${phoneNumber}@c.us`;

  useEffect(() => {
    if (result.data) {
      console.log(result?.data.receiptId);
      setActiveChatId(chatId);
      setReceiptId(result?.data.receiptId);
      if (result?.data.body.messageData) {
        let textMessage;
        let isIncoming;
        switch (result?.data.body.typeWebhook) {
          case "incomingMessageReceived":
            textMessage =
              result?.data.body.messageData.textMessageData?.textMessage;
            isIncoming = true;
            break;
          case "outgoingMessageReceived":
            textMessage =
              result?.data.body.messageData.extendedTextMessageData?.text ||
              result?.data.body.messageData.textMessageData?.textMessage;
            isIncoming = false;
            break;
          case "outgoingAPIMessageReceived":
            textMessage =
              result?.data.body.messageData.extendedTextMessageData?.text;
            isIncoming = false;
            break;
          default:
            return;
        }

        if (!messages.some((message) => message.text === textMessage)) {
          dispatch(
            addMessage({ chatId, message: { text: textMessage, isIncoming } })
          );
        }
      }
    }
  }, [result]);

  useEffect(() => {
    if (receiptId) {
      deleteNotification({
        idInstance,
        apiTokenInstance,
        receiptId,
      });
    }
  }, [deleteNotification, receiptId]);

  const handleSendMessage = async () => {
    await sendMessage({
      idInstance,
      apiTokenInstance,
      chatId,
      message: newMessage,
    });

    setNewMessage("");
  };

  const handleReceiveMessages = async () => {
    await trigger({
      idInstance,
      apiTokenInstance,
    });
  };
  const chatIds = Object.keys(useSelector((state) => state.chat.chats));

  const handleChatClick = (chatId) => {
    setActiveChatId(chatId);
  };

  return (
    <>
      <Sidebar chatIds={chatIds} onChatClick={handleChatClick} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {messages.map((message, index) => (
          <MessageBox key={index} isIncoming={message.isIncoming}>
            {message.text}
          </MessageBox>
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
    </>
  );
}

export default Chat;
