export interface IToken {
  id: string
  name: string
  symbol: string
  imageUrl: string
  amount: number
  price: number
  network: string
  createdAt: string
}

export type ITokenResponse = IToken[]