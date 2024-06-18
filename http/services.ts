import axios from "axios";
import { Tag, Token } from "@prisma/client";

const httpClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const cryptoChangeService = {
  createPayment: async (body: any) => {
    const { data } = await httpClient.post("/api/payments", body);
  },
  getAllTokens: async () => {
    const { data } = await httpClient.get<Token[]>("/tokens");

    return data;
  },
  getAllTokenTags: async () => {
    const { data } = await httpClient.get<Tag[]>("/tags");

    return data;
  },
};
