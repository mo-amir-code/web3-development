import type { AuthUserType } from "../components";

type TabType = "wallet" | "app";

type AppStoreState = {
  tab: TabType;
};

type AppStoreActions = {
  setTab: (tab: TabType) => void;
};

type ManualUserType = {
      idToken: string,
      email: string,
      name: string | null,
      phone: string | null,
      photoURL: string | null,
}

type AuthStoreState = {
  googleAuthProvider: any;
  isUserLoggedIn: boolean;
  userInfo: ManualUserType | null
};

type AuthStoreActions = {
  setGoogleAuthProvider: (provider: any) => void;
  setUserStatus: (status: boolean) => void;
  setUserInfo: (userInfo: ManualUserType | null) => void;
};

export type {
  TabType,
  AppStoreState,
  AppStoreActions,
  AuthStoreActions,
  AuthStoreState,
  ManualUserType
};
