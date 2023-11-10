import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useGetStateInstanceQuery } from "../store/api/apiSlice";
import {
  setApiTokenInstance,
  setIdInstance,
  setPhoneNumber,
} from "../store/reducers/userSlice";
import {
  LoginPageContainer,
  StyledButton,
  StyledLoginForm,
  StyledTextError,
} from "../Styles/styles";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [idInstance, setIdInstances] = useState<number | null>();
  const [apiTokenInstance, setApiTokenInstances] = useState("");
  const [phoneNumber, setInputValue] = useState<number | null>();
  const [wrongPhoneNumber, setWrongPhoneNumber] = useState("");
  const [wrongIdInstance, setWrongIdInstance] = useState("");

  const {
    data: state,
    error,
    isLoading,
  } = useGetStateInstanceQuery({
    idInstance,
    apiTokenInstance,
  });

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      setWrongIdInstance("Тут должно быть число");
    } else {
      setWrongIdInstance("");
      setIdInstances(value);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(setIdInstance(idInstance));
    dispatch(setApiTokenInstance(apiTokenInstance));
    dispatch(setPhoneNumber(phoneNumber));

    if (!error) return navigate("/chat");
    if (error) {
      console.log("Ошибка запроса", error);
    } else if (isLoading) {
      console.log("Загрузка");
    } else if (state === "authorized") {
      navigate("/chat");
    } else {
      console.error("Ошибка: Пользователь не авторизован");
    }
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      setWrongPhoneNumber("Тут должно быть число");
    } else {
      setWrongPhoneNumber("");
      setInputValue(Number(e.target.value));
    }
  };

  return (
    <LoginPageContainer>
      <StyledLoginForm onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={idInstance !== null ? idInstance : ""}
            onChange={handleIdChange}
            placeholder="idInstance"
          />
          {wrongIdInstance && (
            <StyledTextError>{wrongIdInstance}</StyledTextError>
          )}
        </label>

        <input
          type="text"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstances(e.target.value)}
          placeholder="apiTokenInstance"
        />
        <label>
          <input
            type="text"
            value={phoneNumber !== null ? phoneNumber : ""}
            onChange={handlePhoneChange}
            placeholder="Phone Number"
          />
          {wrongPhoneNumber && (
            <StyledTextError>{wrongPhoneNumber}</StyledTextError>
          )}
        </label>
        <StyledButton type="submit">Войти</StyledButton>
      </StyledLoginForm>
    </LoginPageContainer>
  );
};
export default LoginPage;
