import React from "react";

import User from "./User";
import { Item, StyledSidebar } from "../Styles/styles";

interface SidebarProps {
  children?: React.ReactNode;
  chatIds: string[];
  setChatIds: (chatIds: string[]) => void;
  onChatClick: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chatIds,
  setChatIds,
  onChatClick,
}) => {
  return (
    <StyledSidebar>
      {chatIds.map((chatId) => (
        <Item key={chatId} onClick={() => onChatClick(chatId)}>
          {chatId}
        </Item>
      ))}
      <User chatIds={chatIds} setChatIds={setChatIds} />
    </StyledSidebar>
  );
};

export default Sidebar;
