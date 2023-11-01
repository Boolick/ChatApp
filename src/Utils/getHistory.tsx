/* export const getChatHistory = async (
  chatId: string,
  idInstance: number,
  apiTokenInstance: string
) => {
  const url = `https://api.green-api.com/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chatId, count: 10 }), // Получить последние 100 сообщений
  });

  if (!response.ok) {
    throw new Error("Ошибка при получении истории чата");
  }

  const data = await response.json();
  return data;
};
 */