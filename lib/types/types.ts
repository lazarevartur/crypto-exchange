import { PaymentStatus } from "@prisma/client";

export interface IReserveItem {
  id: string;
  name: string;
  icon: string;
  amount: number;
  price: number;
  type: string[];
  min: number;
}

export interface IPaymentRequest {
  from: Token;
  to: Token;
  recipient: Recipient;
  account?: string;
  network: string;
}
export interface ICreateTokenRequest {
  name: string;
  address: string;
  symbol: string;
  imageUrl: string;
  infoText?: string;
  network: string;
  amount: number;
  price: number;
  min: number;
}

export interface IUpdateStatusRequest {
  paymentId: string;
  status: PaymentStatus;
}

interface Token {
  tokenNameOrId: string;
  amount: string;
}

export interface Recipient {
  address: string;
  email: string;
}

export interface AdminHistoryItem {
  ticketId: string;
  tokenFromPrice: number;
  tokenToPrice: number;
  createdAt: Date;
  closedAt: Date | null;
  status: PaymentStatus;
}

interface HistoryToken {
  amount: string;
  tokenName: string;
  price: string;
}

export interface IUserHistoryItem {
  ticketId: string;
  from: HistoryToken;
  to: HistoryToken;
  createdAt: Date;
  closedAt: Date | null;
  status: PaymentStatus;
}
