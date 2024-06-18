export interface IReserveItem {
  id: string;
  name: string;
  icon: string;
  amount: number;
  type: string[];
}

export interface IPaymentRequest {
  from: Token
  to: Token
  recipient: Recipient
  account?: string
}

interface Token {
  tokenNameOrId: string
  amount: string
}

export interface Recipient {
  address: string
  email: string
}
