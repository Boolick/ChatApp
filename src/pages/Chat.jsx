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

import {
  Header,
  ChatContainer,
  MessageContainer,
  SendButton,
  InputField,
  Footer,
  Container,
  MessageBox,
} from "../Styles/styles";
import Sidebar from "../components/Sidebar";

function Chat() {
  const dispatch = useDispatch();
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

  useEffect(() => {
    setCurrentUser(chatId);
    if (result?.data) {
      setReceiptId(result?.data.receiptId);
      if (result?.data.body.messageData) {
        let textMessage;
        let isIncoming;

        switch (result?.data.body.typeWebhook) {
          case "outgoingMessageStatus":
            break;
          //Обработка входящего сообщения
          case "incomingMessageReceived":
            textMessage =
              result?.data.body.messageData.textMessageData?.textMessage;
            isIncoming = true;
            break;
          //Обработка исходящего сообщения
          case "outgoingMessageReceived":
            textMessage =
              result?.data.body.messageData.extendedTextMessageData?.text ||
              result?.data.body.messageData.textMessageData?.textMessage;
            isIncoming = false;
            break;
          //Обработка исходящего через API сообщения
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
              chatId: result.data.body.senderData.chatId,
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

  const handleChatClick = (chatId) => {
    setActiveChatId(chatId);
    dispatch(setPhoneNumber(Number(chatId.split("@")[0])));
  };

  return (
    <Container>
      <Sidebar
        activeChatId={activeChatId}
        chatIds={chatIds}
        setChatIds={setChatIds}
        onChatClick={handleChatClick}
      />
      <ChatContainer>
        <Header>
          {phoneNumber !== null ? (
            <p>Текущий пользователь: {phoneNumber}</p>
          ) : (
            <p>...</p>
          )}
        </Header>
        <MessageContainer>
          {messages.map((message, index) => (
            <MessageBox key={index} isIncoming={message.isIncoming}>
              {message.text}
            </MessageBox>
          ))}
        </MessageContainer>
        <Footer>
          <InputField
            placeholder="Введите сообщение"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <SendButton onClick={handleSendMessage}>Send</SendButton>
        </Footer>
      </ChatContainer>
    </Container>
  );
}

export default Chat;

Chat.propTypes = {
  result: PropTypes.any,
};
