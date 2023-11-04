import styled from "styled-components";

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-self: ${(props) => (props.isIncoming ? "flex-start" : "flex-end")};
  justify-content: flex-start;
  border: #727a86 solid 1px;
  border-radius: 16px;
  transition: all 0.5s;
  min-width: 40px;
  width: fit-content;
  height: fit-content;
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
