import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/custom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/config/firebase";
import type { Props } from "@/types/layouts";
import type { ManualUserType } from "@/types/zustand";
import { useAuthStore } from "@/zustand/AuthStore";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const HomeLayout: React.FC<Props> = () => {
  const { setUserInfo, setUserStatus } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: (User & any) | null) => {
        if (user) {
          const userInfo: ManualUserType = {
            idToken: user.accessToken,
            email: user.email!,
            name: user.displayName,
            phone: user.phoneNumber,
            photoURL: user.photoURL,
          };

          setUserInfo(userInfo);
          setUserStatus(true);
        } else {
          setUserInfo(null);
          setUserStatus(false);
        }
      }
    );
    return () => unsubscribe();
  }, []);

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
