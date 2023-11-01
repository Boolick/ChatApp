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
import { StyledButton, StyledLoginForm } from "../Styles/styles";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [idInstance, setIdInstances] = useState<number>(7103858998);
  const [apiTokenInstance, setApiTokenInstances] = useState(
    "d7cb43057842413c9b1ac50f79bf5d316b4f078a52ac4b52bf"
  );
  const [phoneNumber, setInputValue] = useState("84359237442");
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
      setWrongPhoneNumber("Номер телефона должен быть числом");
    } else {
      setWrongPhoneNumber("");
      setInputValue(e.target.value);
    }
  };

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          value={idInstance}
          onChange={handleIdChange}
          placeholder="idInstance"
        />
        {wrongIdInstance && <p>{wrongIdInstance}</p>}
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
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="Phone Number"
        />
        {wrongPhoneNumber && <p>{wrongPhoneNumber}</p>}
      </label>
      <StyledButton type="submit">Войти</StyledButton>
    </StyledLoginForm>
  );
};
export default LoginPage;
