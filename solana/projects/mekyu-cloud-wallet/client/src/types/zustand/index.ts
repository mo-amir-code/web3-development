type TabType = "wallet" | "app";

type AppStoreState = {
  tab: TabType;
}

type AppStoreActions = {
    setTab: (tab: TabType) => void
}

export type { TabType, AppStoreState, AppStoreActions };
