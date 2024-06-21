import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ActiveChangeCurrencyStore {
  isAuth?: boolean;
  setIsAuth: (isAuth?: boolean) => void;
}

export const useConfig = create<ActiveChangeCurrencyStore>()(
  immer((set) => ({
    isAuth: false,
    setIsAuth: (isAuth) =>
      set((state) => {
        state.isAuth = isAuth;
      }),
  })),
);
