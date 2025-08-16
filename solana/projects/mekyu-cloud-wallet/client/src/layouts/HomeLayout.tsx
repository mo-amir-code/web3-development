import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/custom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Props } from "@/types/layouts";
import { Outlet } from "react-router-dom";

const HomeLayout: React.FC<Props> = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="w-full">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default HomeLayout;
