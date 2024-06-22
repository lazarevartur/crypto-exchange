import axios from "axios";
import { Payment, PaymentStatus, Ticket, Token } from "@prisma/client";
import { IPaymentRequest, IUpdateStatusRequest } from "@/lib/types/types";
import { IPayloadResponse } from "@/lib/types/Payload";
import { ITicketResponse } from "@/lib/types/http/Ticket";

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
    const { data } = await httpClient.post<Ticket>("/payments/status", body);

    return data;
  },
  getAllTokens: async () => {
    const { data } = await httpClient.get<Token[]>("/tokens");

    return data;
  },
  getAllTokenTags: async () => {
    const { data } = await httpClient.get<string[]>("/tags");

    return data;
  },
  getAllPayments: async (status?: PaymentStatus) => {
    const { data } = await httpClient.get<IPayloadResponse[]>("/payments", {
      params: { status },
    });

    return data;
  },
  getPaymentById: async (id: string) => {
    const { data } = await httpClient.get<IPayloadResponse>("/payments", {
      params: { id },
    });

    return data;
  },
  getAllTickets: async (status?: PaymentStatus) => {
    const { data } = await httpClient.get<Ticket[]>("/tickets", {
      params: { status },
    });

    return data;
  },
  getAllTicketsAdmin: async (status?: PaymentStatus) => {
    const { data } = await httpClient.get<ITicketResponse[]>("/tickets/admin", {
      params: { status },
    });

    return data;
  },
  getTicketById: async (id: string) => {
    const { data } = await httpClient.get<ITicketResponse>("/tickets", {
      params: { id },
    });

    return data;
  },

  login: async (address: string) => {
    const { data } = await httpClient.post<{ userId: string }>("/auth/login", {
      ethAddress: address,
    });

    return data;
  },
  logout: async () => {
    const { data } = await httpClient.post("/auth/logout");

    return data;
  },
};
