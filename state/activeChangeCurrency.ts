import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IReserveItem } from "@/lib/types/types";

export type Direction = "from" | "to";

interface Recipient {
  address: string;
  email: string;
}

interface ActiveChangeCurrencyStore {
  from?: IReserveItem;
  to?: IReserveItem;
  amount: {
    from: number;
    to: number;
  };
  network?: string;
  setNetwork: (network: string) => void;
  recipient?: Recipient;
  setActiveCurrency: (data: IReserveItem & { direction: Direction }) => void;
  setAmount: ({
    direction,
    amount,
  }: {
    direction: Direction;
    amount: number;
  }) => void;
  setRecipient: (data: Recipient) => void;
}

export const useActiveChangeCurrency = create<ActiveChangeCurrencyStore>()(
  immer((set) => ({
    amount: {
      from: 0,
      to: 0,
    },
    setActiveCurrency: ({ direction, ...item }) =>
      set((state) => {
        state[direction] = item;
      }),
    setAmount: ({ amount, direction }) =>
      set((state) => {
        state.amount[direction] = amount;
      }),
    setNetwork: (network) =>
      set((state) => {
        state.network = network;
      }),
    setRecipient: (recipient) =>
      set((state) => {
        state.recipient = recipient;
      }),
  })),
);
