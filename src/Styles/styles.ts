import { ReactNode } from "react";
import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 900vw;
  margin: 0 auto;
  padding: 2vw;
  text-align: center;

  color: #888;
  background-color: #111b21;
`;
export const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
  border-radius: 16px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  padding: 2em;

  color: #888;
  background-color: #233138;
`;
export const StyledLink = styled.a`
  font-weight: 500;
  color: #69aaed;
  text-decoration: none;
  text-decoration: inherit;
  &:hover {
    text-decoration: underline;
    color: #535bf2;
  }
`;
export const StyledText = styled.p`
  color: #e4e8ec;
`;
export const StyledTitel = styled.h1`
  font-size: 2em;
  line-height: 1.1;
  padding: 5%;
`;
export const StyledButton = styled.button`
  border-radius: 8px;
  max-height: 40px;
  border: 1px solid transparent;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  margin: 2vw;
  background-color: #017561;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #646cff;
  }
  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

interface AvatarProps {
  src: string;
}

export const Avatar = styled.img<AvatarProps>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

interface ItemProps {
  children: ReactNode;
}

export const List = styled.ul`
  display: flex;
  gap: 10px;
  flex-direction: column;
  }`;

export const StyledSidebar = styled.div`
  position: fixed;
  left: 0;
  width: 30vw;
  height: 100vh;
  border: 1px solid black;
  top: 0;
  background-color: #1f2428;
  overflow: hidden;
`;

export const Item = styled.li<ItemProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  background-color: #1f2428;
  height: 50px;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  /* border: #727a86 solid 1px; */
  border-radius: 8px;
  padding: 5px;
  margin: 5px 15px 5px 5px;
  overflow: hidden;

  &:hover {
    background-color: #272b33;
    transform: scale(1.01);
    transition: all 0.3s;
  }
`;

interface UserCardProps {
  children: ReactNode;
  isVisible: boolean;
}
export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #111b21;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const MessageBox = styled.div<UserCardProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  border: #727a86 solid 1px;
  border-radius: 16px;

  transition: all 0.5s;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  min-width: 400px;
  width: fit-content;
  height: fit-content;
  background: #0a0c10;
  padding: 10px 10px 10px 10px;
  color: #f0f3f6;

  & a {
    color: #6fb3f9;
  }
  & img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
`;
interface SearchWrapperProps {
  children: React.ReactNode;
}

export const StyledForm = styled.form`
  position: fixed;
  left: 30vw;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: row;
  width: 70vw;

  background-color: #1f2428;
  margin-left: 2px;
`;

export const SearchWrapper = styled.div<SearchWrapperProps>`
  width: 100vw;
  border-bottom: 1px solid #7a828e;
  background-color: #010409;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  padding: 50px 0 50px 0;
`;
export const SearchInput = styled.input`
  flex-grow: 100;
  background-color: transparent;
  border: 1px solid #7a828e;
  border-radius: 5px;
  padding: 13px 10px 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #f4f5f5;
  transition: all 0.3s ease;
`;

export const StyledBody = styled.body`
  background-color: #242424;
`;

export const Avatarblock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const loading = keyframes`
  0% {
    content: "Загрузка";
  }
  25% {
    content: "Загрузка.";
  }
  50% {
    content: "Загрузка..";
  }
  75% {
    content: "Загрузка...";
  }
`;

export const StyledLoading = styled.div`
  position: fixed;
  top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #6fb3f9;
  width: 200px;
  height: 200px;

  &:before {
    content: "Загрузка";
    animation: ${loading} 2s linear infinite;
    text-align: center;
    width: 100%;
    height: auto;
    display: block;
    font-size: 48px;
    color: #39d353;
    margin-top: -50px;
  }
`;

export const StyledErrorMessage = styled.a`
  position: fixed;
  top: 50%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  height: 60px;
  gap: 20px;
  align-items: center;
  cursor: pointer;
  border: #e34c26 solid 1px;
  border-radius: 8px;
  background: #0a0c10;
  padding: 5%;

  font-weight: 500;
  color: #e34c26;
  text-decoration: none;
  text-decoration: inherit;
  &:hover {
    text-decoration: underline;
    color: #535bf2;
  }
`;

export const StyledTextError = styled.p`
  position: fixed;
  top: 25%;
  color: #e34c26;
  font-size: 16px;
`;
