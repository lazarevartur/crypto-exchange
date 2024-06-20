export interface IPayloadResponse {
  id: string;
  fromTokenId: string;
  fromAmount: string;
  toTokenId: string;
  toAmount: string;
  recipientAddress: string;
  recipientEmail: string;
  userId: string;
  expiresIn: string;
  createdAt: string;
  closedIn: any;
  status: string;
  approveStatus: string;
  network: string;
  fromToken: ITokenResponse;
  toToken: ITokenResponse;
}

export interface ITokenResponse {
  id: string;
  name: string;
  symbol: string;
  imageUrl: string;
  amount: number;
  price: number;
  network: string;
  createdAt: string;
  tags: string[];
  min: number;
  infoText: any;
}
