// import type { AuthUserType } from "../components";

import type { TokenMetadataType } from "../components";

type TabType = "wallet" | "app";

type AppStoreState = {
  tab: TabType;
  tokens: TokenMetadataType[];
};

type AppStoreActions = {
  setTab: (tab: TabType) => void;
  setTokens: (tokens: TokenMetadataType[]) => void;
};

type ManualUserType = {
  idToken: string;
  email: string;
  name: string | null;
  phone: string | null;
  photoURL: string | null;
};

type AuthStoreState = {
  googleAuthProvider: any;
  isUserLoggedIn: boolean;
  userInfo: ManualUserType | null;
};

type AuthStoreActions = {
  setGoogleAuthProvider: (provider: any) => void;
  setUserStatus: (status: boolean) => void;
  setUserInfo: (userInfo: ManualUserType | null) => void;
};

type WalletType = {
  publicKey: string;
  privateKey: string | null;
};

type UserStoreState = {
  wallet: WalletType | null;
  connection: any;
};

type UserStoreAction = {
  setPubKey: (key: string) => void;
  setPvtKey: (key: string) => void;
  setConnection: (con: any) => void;
};

export type {
  TabType,
  AppStoreState,
  AppStoreActions,
  AuthStoreActions,
  AuthStoreState,
  ManualUserType,
  WalletType,
  UserStoreAction,
  UserStoreState,
};
