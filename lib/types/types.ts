import { PaymentStatus } from "@prisma/client";

export interface IReserveItem {
  id: string;
  name: string;
  icon: string;
  amount: number;
  type: string[];
}

export interface IPaymentRequest {
  from: Token;
  to: Token;
  recipient: Recipient;
  account?: string;
  network: string;
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
  paymentId: string;
  tokenFromPrice: number;
  tokenToPrice: number;
  createdAt: Date;
  closedAt: Date | null;
  status: PaymentStatus;
}
