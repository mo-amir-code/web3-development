import { LayoutGrid, PanelLeftIcon, Wallet } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebar } from "../ui/sidebar";
import ButtonWithIcon from "../ui/ButtonWithIcon";
import { useAppStore } from "@/zustand/AppStore";
import { useUserStore } from "@/zustand/UserStore";
import { useAuthStore } from "@/zustand/AuthStore";

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const { setTab, tab } = useAppStore();
  const { wallet } = useUserStore();
  const { userInfo } = useAuthStore();

  return (
    <header className="flex items-center justify-between py-2 px-4">
      {/* logo */}
      <div className="flex-1 md:block hidden"></div>

      {/* Tabs */}
      <div className="flex-1 flex items-center justify-center">
        <div className="border rounded-lg p-1 space-x-1">
          <ButtonWithIcon
            name="Wallet"
            handleOnClick={() => setTab("wallet")}
            isSelected={tab === "wallet"}
          >
            <Wallet />
          </ButtonWithIcon>
          <ButtonWithIcon
            name="Apps"
            handleOnClick={() => setTab("app")}
            isSelected={tab === "app"}
          >
            <LayoutGrid />
          </ButtonWithIcon>
        </div>
      </div>

      {/* Profile & Wallet */}
      <div className="flex-1 flex items-center justify-end gap-2">
        <div className="bg-sidebar text-blue-500 px-3 py-2 flex items-center justify-center gap-2 shadow-sm cursor-pointer rounded-md">
          <span>
            {wallet
              ? `${wallet.publicKey.slice(0, 4)}...${wallet.publicKey.slice(
                  -3
                )}`
              : ""}
          </span>
          <Wallet />
        </div>
        <div
          onClick={() => toggleSidebar()}
          className="flex items-center justify-center bg-sidebar px-3 py-2 shadow-sm cursor-pointer rounded-md gap-2"
        >
          <Avatar>
            <AvatarImage src={userInfo?.photoURL || "#"} />
            <AvatarFallback>MekYu</AvatarFallback>
          </Avatar>
          <PanelLeftIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
