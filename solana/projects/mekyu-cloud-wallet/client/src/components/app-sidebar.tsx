import { Cog, LogOut, ScanQrCode, Wallet } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ButtonWithIcon from "./ui/ButtonWithIcon";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/zustand/AuthStore";
import { useUserStore } from "@/zustand/UserStore";
import { useCallback, useRef } from "react";
import toast from "react-hot-toast";
import AnimatedModalDemo from "./ui/Modal";
import { Secret } from "@/sections";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useNavigate();
  const { userInfo } = useAuthStore();
  const { wallet } = useUserStore();
  const modalRef = useRef<any>(null);

  const handleToCopyPublicKey = useCallback(async () => {
    if (!wallet) {
      toast.error("Something went wrong!");
      return;
    }

    try {
      await navigator.clipboard.writeText(wallet.publicKey);
      toast.success("Wallet address copied");
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while copyin text");
    }
  }, [wallet, toast]);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={userInfo?.photoURL || "#"}
                  alt={userInfo?.name || "MekYu"}
                />
                <AvatarFallback className="rounded-lg">MekYu</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userInfo?.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {userInfo?.email || "loading..."}
                </span>
              </div>

              <AnimatedModalDemo
                className="border-transparent"
                name={<Cog className="ml-auto size-4" />}
                ref={modalRef}
              >
                <Secret ref={modalRef} />
              </AnimatedModalDemo>
            </SidebarMenuButton>

            <SidebarMenuButton
              size={"lg"}
              className="flex items-center gap-1.5"
            >
              <ButtonWithIcon
                handleOnClick={() => handleToCopyPublicKey()}
                name="Wallet Address"
                className="flex-1"
              >
                <Wallet />
              </ButtonWithIcon>
              <ButtonWithIcon
                handleOnClick={() => {
                  window.open(
                    `https://solscan.io/account/${
                      wallet?.publicKey || "error"
                    }`,
                    "_blank"
                  );
                }}
                name="See on SolScan"
                className="flex-1"
              >
                <ScanQrCode />
              </ButtonWithIcon>
            </SidebarMenuButton>

            {/* <SidebarMenuButton>
              <ButtonWithIcon name="Connect Wallet" className="flex-1">
                <Wallet />
              </ButtonWithIcon>
            </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuButton
              size={"lg"}
              className="bg-blue-500/10 font-semibold text-blue-500"
            >
              MekYu Account
            </SidebarMenuButton>

            <SidebarMenuButton
              onClick={() => {
                signOut(auth);
                router("/auth");
              }}
              size={"lg"}
              className="cursor-pointer"
            >
              <LogOut /> <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
