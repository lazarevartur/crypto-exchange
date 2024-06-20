import { Payment, Token } from "@prisma/client";

export interface IPayloadResponse extends Payment {
  fromToken?: Token;
  toToken?: Token;
}
