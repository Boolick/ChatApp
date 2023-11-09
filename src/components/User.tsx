import React from "react";
import { useState } from "react";

import {
  UserForm,
  SearchInput,
  UserBox,
  StyledButton,
  StyledTextError,
} from "../Styles/styles";

function User({ chatIds, setChatIds }) {
  const [phoneNumbers, setPhoneNumbers] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [wrongPhoneNumber, setWrongPhoneNumber] = useState("");
  const [placeholder, setPlaceholder] = useState("Введите номер телефона");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPlaceholder("Введите номер телефона");
    if (isNaN(value)) {
      setWrongPhoneNumber("Тут должно быть число");
    } else {
      setWrongPhoneNumber("");
      setInputValue(e.target.value);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue) {
      const phoneNumberToAdd = Number(inputValue);
      if (!phoneNumbers.some((number) => number === phoneNumberToAdd)) {
        setPhoneNumbers([...phoneNumbers, phoneNumberToAdd]);
        setInputValue("");
        setChatIds([...chatIds, `${inputValue}@c.us`]);
      } else {
        setInputValue("");
        setPlaceholder("Номер уже добавлен!");
      }
    } else {
      setPlaceholder("Не может быть пустым!");
    }
  };

  return (
    <UserBox>
      <UserForm onSubmit={handlePhoneSubmit}>
        <label>
          <SearchInput
            type="text"
            value={inputValue}
            onChange={handlePhoneChange}
            placeholder={placeholder}
          />
          {wrongPhoneNumber && (
            <StyledTextError>{wrongPhoneNumber}</StyledTextError>
          )}
        </label>
        <StyledButton type="submit">Добавить номер</StyledButton>
      </UserForm>
    </UserBox>
  );
}
export default User;
