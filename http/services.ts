import axios from "axios";
import { Payment, Tag, Token } from "@prisma/client";
import { IPaymentRequest, IUpdateStatusRequest } from "@/lib/types/types";
import { IPayloadResponse } from "@/lib/types/Payload";

const httpClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const cryptoChangeService = {
  createPayment: async (body: IPaymentRequest) => {
    const { data } = await httpClient.post<Payment>("/payments", body);

    return data;
  },
  updatePaymentStatus: async (body: IUpdateStatusRequest) => {
    const { data } = await httpClient.post<Payment>("/payments/status", body);

    return data;
  },
  getAllTokens: async () => {
    const { data } = await httpClient.get<Token[]>("/tokens");

    return data;
  },
  getAllTokenTags: async () => {
    const { data } = await httpClient.get<Tag[]>("/tags");

    return data;
  },
  getPaymentById: async (id: string) => {
    const { data } = await httpClient.get<IPayloadResponse>("/payments", {
      params: { id },
    });

    return data;
  },
};
