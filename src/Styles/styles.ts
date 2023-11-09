import { ReactNode } from "react";
import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  width: 100vw;
  margin: 0 auto;

  color: #888;
  background-color: #111b21;
`;
export const Header = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  background-color: #1f2428;
  border-bottom: 1px black solid;
  color: #6fb3f9;
  height: 50px;
  width: -webkit-fill-available;
`;
export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vw;
  color: #888;
  background-color: #111b21;
  margin: 50px 0px 50px 0px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
interface MessageBoxProps {
  isIncoming: boolean;
}

export const MessageBox = styled.div<MessageBoxProps>`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-self: ${(props) => (props.isIncoming ? "flex-start" : "flex-end")};
  justify-content: flex-start;
  border: #727a86 solid 1px;
  border-radius: 16px;
  transition: all 0.5s;
  min-width: 40px;
  max-width: 650px;
  background: ${(props) => (props.isIncoming ? "#212E36" : "#00A884")};
  padding: 10px 10px 10px 10px;
  margin: 10px 10px 10px 10px;
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
export const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
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
  color: #e4e8ec;
`;
export const StyledTitel = styled.h1`
  font-size: 2em;
  line-height: 1.1;
  padding: 5%;
`;
export const StyledButton = styled.button`
  border-radius: 8px;
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
export const SendButton = styled.button`
  background-color: #128c7e;
  color: #fff;
  padding: 10px 20px;
  border: 1px solid transparent;
  border-radius: 20px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    border-color: #fff;
  }
  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;
export const InputField = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 20px;
`;
export const Footer = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  margin: 12px;
  flex-direction: row;
  width: -webkit-fill-available;
`;

interface ItemProps {
  children: ReactNode;
}

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
`;
export const StyledSidebar = styled.div`
  position: fixed;
  width: 348px;
  height: 100vh;
  border: 1px solid black;
  left: 0;
  background-color: #1f2428;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const UserBox = styled.div``;

export const Item = styled.li<ItemProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;

  background-color: #1f2428;
  height: 50px;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  /* border: #727a86 solid 1px; */
  border-radius: 8px;
  padding: 5px;
  margin: 15px;
  overflow: hidden;

  &:hover {
    background-color: #272b33;
    transform: scale(1.01);
    transition: all 0.3s;
  }
  &.active::after {
    content: "";
    top: 0;
    left: 0;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    background-color: #00a884;
  }
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
  width: 74vw;
  background-color: #111b21;
  overflow: auto;
  margin-left: 350px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

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

export const SearchInput = styled.input`
  flex-grow: 100;
  background-color: transparent;
  border: 1px solid #7a828e;
  margin-top: 2vw;
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
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: #e34c26;
  font-size: 16px;
  transition: all ease 0.3s;
  margin: 0;
  padding-left: 2vw;
`;
