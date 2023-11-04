import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { List } from "../Styles/styles";

import checkWhatsApp from "../Utils/checkWhatsApp";
import { RootState } from "../store/store";

function User({ chatIds, setChatIds }) {
  const [phoneNumbers, setPhoneNumbers] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [wrongPhoneNumber, setWrongPhoneNumber] = useState("");
  const { idInstance, apiTokenInstance, phoneNumber } = useSelector(
    (state: RootState) => state.user
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      setWrongPhoneNumber("Номер телефона должен быть числом");
    } else {
      setWrongPhoneNumber("");
      setInputValue(e.target.value);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      const exitstsWhatsApp = await checkWhatsApp(
        Number(inputValue),
        idInstance,
        apiTokenInstance
      );
      if (exitstsWhatsApp) {
        setPhoneNumbers([...phoneNumbers, Number(inputValue)]);
        setInputValue("");
        setChatIds([...chatIds, `${inputValue}@c.us`]);
      } else {
        console.log("Номер не зарегистрирован в WhatsApp");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handlePhoneSubmit}>
        <label>
          <input
            type="text"
            value={inputValue}
            onChange={handlePhoneChange}
            placeholder="Phone Number"
          />
          {wrongPhoneNumber && <p>{wrongPhoneNumber}</p>}
        </label>
        <button type="submit">Добавить номер</button>
      </form>
      <List>{phoneNumber && <p>Текущий пользователь: {phoneNumber}</p>}</List>
    </div>
  );
}
export default User;
