import React from "react";
import { useState } from "react";

import { StyledSidebar } from "../Styles/styles";
import User from "./User";
import { Item } from "../Styles/styles";

interface SidebarProps {
  children?: React.ReactNode;
  chatIds: string[];
  onChatClick: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chatIds, onChatClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <StyledSidebar>
      <button onClick={toggleSidebar}>
        {isOpen ? "Закрыть сайдбар" : "Открыть сайдбар"}
      </button>
      {chatIds.map((chatId) => (
        <Item key={chatId} onClick={() => onChatClick(chatId)}>
          {chatId}
        </Item>
      ))}
      <User />
    </StyledSidebar>
  );
};

export default Sidebar;
