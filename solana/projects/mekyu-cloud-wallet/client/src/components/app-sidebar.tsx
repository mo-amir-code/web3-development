import * as React from "react";
import { Cog, Files, GalleryVerticalEnd, LogOut, Wallet } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ButtonWithIcon from "./ui/ButtonWithIcon";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={"#"} alt={"demo"} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{"MekYu"}</span>
                <span className="text-muted-foreground truncate text-xs">
                  mo.amir.code@gmail.com
                </span>
              </div>
              <Cog className="ml-auto size-4" />
            </SidebarMenuButton>

            <SidebarMenuButton
              size={"lg"}
              className="flex items-center gap-1.5"
            >
              <ButtonWithIcon name="Wallet Address" className="flex-1">
                <Wallet />
              </ButtonWithIcon>
              <ButtonWithIcon name="Copy Address" className="flex-1">
                <Files />
              </ButtonWithIcon>
            </SidebarMenuButton>

            <SidebarMenuButton>
              <ButtonWithIcon name="Connect Wallet" className="flex-1">
                <Wallet />
              </ButtonWithIcon>
            </SidebarMenuButton>
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

            <SidebarMenuButton size={"lg"} className="cursor-pointer">
              <LogOut /> <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
