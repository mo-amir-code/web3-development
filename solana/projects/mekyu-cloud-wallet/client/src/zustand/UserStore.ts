import type { UserStoreAction, UserStoreState } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useUserStore = create<UserStoreState & UserStoreAction>()(
  immer((set) => ({
    wallet: null,
    connection: null,
    setPubKey: (key: string) =>
      set((state) => {
        state.wallet = {
          publicKey: key,
          privateKey: null,
        };
      }),
    setPvtKey: (key: string) =>
      set((state) => {
        if (state.wallet) {
          state.wallet.privateKey = key;
        }
      }),
    setConnection: (con: string) =>
      set((state) => {
        state.connection = con;
      }),
  }))
);

export { useUserStore };
