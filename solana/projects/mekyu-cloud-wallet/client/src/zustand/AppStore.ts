import type { TokenMetadataType } from "@/types/components";
import type {
  AppStoreActions,
  AppStoreState,
  ModeType,
  TabType,
} from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useAppStore = create<AppStoreState & AppStoreActions>()(
  immer((set) => ({
    tab: "wallet",
    tokens: [],
    mode: "default",
    setTab: (tab: TabType) =>
      set((state) => {
        state.tab = tab;
      }),
    setTokens: (tokens: TokenMetadataType[]) =>
      set((state) => {
        state.tokens = tokens;
      }),
    setMode: (mode: ModeType) =>
      set((state) => {
        state.mode = mode;
      }),
  }))
);

export { useAppStore };
