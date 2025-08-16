import { LayoutGrid, PanelLeftIcon, Wallet } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebar } from "../ui/sidebar";
import ButtonWithIcon from "../ui/ButtonWithIcon";
import { useAppStore } from "@/zustand/AppStore";

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const { setTab, tab } = useAppStore();

  return (
    <header className="flex items-center justify-between py-2 px-4">
      {/* logo */}
      <div></div>

      {/* Tabs */}
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

      {/* Profile & Wallet */}
      <div className="flex items-center justify-center gap-2">
        <div className="bg-sidebar px-3 py-2 shadow-sm cursor-pointer rounded-md">
          <Wallet className="text-blue-500" />
        </div>
        <div
          onClick={() => toggleSidebar()}
          className="flex items-center justify-center bg-sidebar px-3 py-2 shadow-sm cursor-pointer rounded-md gap-2"
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <PanelLeftIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
