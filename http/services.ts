import axios from "axios";
import { Tag, Token } from "@prisma/client";
import { IPaymentRequest } from "@/lib/types/types";

const httpClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const cryptoChangeService = {
  createPayment: async (body: IPaymentRequest) => {
    const { data } = await httpClient.post("/payments", body);

    return data
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
