async function checkWhatsApp(
  phoneNumber: number,
  idInstance: number,
  apiTokenInstance: string
) {
  const url = `https://api.green-api.com/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber }),
  });

  if (!response.ok) {
    throw new Error("Ошибка при проверке номера телефона");
  }

  const data = await response.json();
  return data.existsWhatsapp;
}

export default checkWhatsApp;
