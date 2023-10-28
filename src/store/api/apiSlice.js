import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.green-api.com/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: ({ idInstance, apiTokenInstance, chatId, message }) => ({
        url: `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        method: "POST",
        body: { chatId, message },
      }),
    }),
    receiveNotification: builder.query({
      query: ({ idInstance, apiTokenInstance }) => ({
        url: `waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
        method: "GET",
      }),
    }),
    deleteNotification: builder.mutation({
      query: ({ idInstance, apiTokenInstance, receiptId }) => ({
        url: `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSendMessageMutation,
  useLazyReceiveNotificationQuery,
  useDeleteNotificationMutation,
} = apiSlice;
