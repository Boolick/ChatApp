import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  useSendMessageMutation,
  useLazyReceiveNotificationQuery,
  useDeleteNotificationMutation,
} from "../store/api/apiSlice";
import { setPhoneNumber, setCurrentUser } from "../store/reducers/userSlice";
import { addMessage } from "../store/reducers/chatReducer";
import { MessageBox } from "../stylesNew/styles";
import Sidebar from "./Sidebar";

function Chat() {
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [activeChatId, setActiveChatId] = useState(null);

  const [newMessage, setNewMessage] = useState("");
  const [receiptId, setReceiptId] = useState(null);
  const [trigger, result] = useLazyReceiveNotificationQuery();
  const [sendMessage] = useSendMessageMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const { phoneNumber, idInstance, apiTokenInstance } = useSelector(
    (state) => state.user
  );
  const chatId = `${phoneNumber}@c.us`;
  const [chatIds, setChatIds] = useState([]);
  const messages = useSelector((state) => state.chat.chats[chatId] || []);
  const [mountedCount, setMountedCount] = useState(0);

  useEffect(() => {
    setCurrentUser(chatId);
    if (result?.data) {
      setMountedCount(mountedCount + 1);
      setReceiptId(result?.data.receiptId);
      if (result?.data.body.messageData) {
        let textMessage;
        let isIncoming;

        switch (result?.data.body.typeWebhook) {
          case "outgoingMessageStatus":
            break;
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

        if (
          !messages.some((message) => message.id === result.data.body.idMessage)
        ) {
          console.log("I was rendered");
          dispatch(
            addMessage({
              id: result.data.body.idMessage,
              chatId: result.data.body.senderData.chatId, // Используйте chatId из result
              message: { text: textMessage, isIncoming },
            })
          );
        }
      }
    }
  }, [result]);

  useEffect(() => {
    const triggerAndScheduleNext = async () => {
      await trigger({
        idInstance,
        apiTokenInstance,
      });
      setTimeout(triggerAndScheduleNext, 5000);
    };

    triggerAndScheduleNext();

    // Очистка эффекта при размонтировании компонента
    return () => clearTimeout(triggerAndScheduleNext);
  }, []);

  useEffect(() => {
    if (receiptId) {
      deleteNotification({
        idInstance,
        apiTokenInstance,
        receiptId,
      });
    }
  }, [receiptId]);

  const handleSendMessage = async () => {
    await sendMessage({
      idInstance,
      apiTokenInstance,
      chatId,
      message: newMessage,
    });

    setNewMessage("");
  };

  //const chatIds = Object.keys(useSelector((state) => state.chat.chats));

  const handleChatClick = (chatId) => {
    setActiveChatId(chatId);
    dispatch(setPhoneNumber(Number(chatId.split("@")[0])));
  };

  return (
    <>
      <Sidebar
        chatIds={chatIds}
        setChatIds={setChatIds}
        onChatClick={handleChatClick}
      />
      <p>Chat component has been mounted {mountedCount} times.</p>
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
      </div>
    </>
  );
}

export default Chat;

Chat.propTypes = {
  result: PropTypes.any, // Здесь указывается ожидаемый тип (в данном случае, any)
};
