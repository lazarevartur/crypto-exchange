import axios from "axios";
import { ITokenResponse } from "@/lib/types/http/Token";

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
    const { data } = await httpClient.get<ITokenResponse>("/tokens");

    return data;
  },
};
