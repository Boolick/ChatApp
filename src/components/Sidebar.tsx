import React from "react";

import User from "./User";
import { Item, StyledSidebar, List } from "../Styles/styles";

interface SidebarProps {
  children?: React.ReactNode;
  chatIds: string[];
  activeChatId: string;
  setChatIds: (chatIds: string[]) => void;
  onChatClick: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chatIds,
  activeChatId,
  setChatIds,
  onChatClick,
}) => {
  return (
    <StyledSidebar>
      <List>
        {chatIds.map((chatId) => (
          <Item
            className={chatId === activeChatId ? "active" : ""}
            key={chatId}
            onClick={() => onChatClick(chatId)}
          >
            {chatId}
          </Item>
        ))}
        <User chatIds={chatIds} setChatIds={setChatIds} />
      </List>
    </StyledSidebar>
  );
};

export default Sidebar;
