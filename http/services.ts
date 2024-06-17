import axios from "axios";

export interface ICreatePayment {
  account?: string;
  from: From;
  to: To;
  recipient: Recipient;
}

export interface From {
  tokenNameOrId: string;
  amount: string;
}

export interface To {
  tokenNameOrId: string;
  amount: string;
}

export interface Recipient {
  address: string;
  email: string;
}

const httpClient = axios.create({
  baseURL: "/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const cryptoChangeApi = {
  createPayment: async (body: ICreatePayment) => {
    const { data } = await httpClient.post<ICreatePayment>(
      "/api/payments",
      body,
    );

    return data;
  },
};
