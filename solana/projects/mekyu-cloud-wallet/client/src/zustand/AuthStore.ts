import type {
  AuthStoreActions,
  AuthStoreState,
  ManualUserType,
} from "@/types/zustand";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
  immer((set) => ({
    googleAuthProvider: null,
    isUserLoggedIn: false,
    userInfo: null,
    setGoogleAuthProvider: (provider: any) =>
      set((state) => {
        state.googleAuthProvider = provider;
      }),
    setUserStatus: (status: boolean) =>
      set((state) => {
        state.isUserLoggedIn = status;
      }),
    setUserInfo: (userInfo: ManualUserType | null) =>
      set((state) => {
        state.userInfo = userInfo;
      })
  }))
);

export { useAuthStore };
