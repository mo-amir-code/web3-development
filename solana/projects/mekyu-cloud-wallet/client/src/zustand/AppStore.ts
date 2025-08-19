import type { TokenMetadataType } from "@/types/components";
import type { AppStoreActions, AppStoreState, TabType } from "@/types/zustand";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useAppStore = create<AppStoreState & AppStoreActions>()(
  immer((set) => ({
    tab: "wallet",
    tokens: [],
    setTab: (tab: TabType) =>
      set((state) => {
        state.tab = tab;
      }),
    setTokens: (tokens: TokenMetadataType[]) =>
      set((state) => {
        state.tokens = tokens;
      }),
  }))
);

export { useAppStore };
