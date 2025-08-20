import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/custom";
import { EntireScreenLoader } from "@/components/custom/Loader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/config/firebase";
import { httpAxios } from "@/lib/axios";
import { handleToGetKey } from "@/lib/queries";
import type { Props } from "@/types/layouts";
import type { ManualUserType } from "@/types";
import { useAuthStore } from "@/zustand/AuthStore";
import { useUserStore } from "@/zustand/UserStore";
import { useMutation } from "@tanstack/react-query";
import { onAuthStateChanged, type User } from "firebase/auth";
import { Fragment, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Connection } from "@solana/web3.js";
import { SOLANA_CHAIN } from "@/config";

const HomeLayout: React.FC<Props> = () => {
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);
  const { setUserInfo, setUserStatus, userInfo, isUserLoggedIn } =
    useAuthStore();
  const { setPubKey, setConnection } = useUserStore();
  const router = useNavigate();

  const mutateWallet = useMutation({
    mutationFn: handleToGetKey,
    onSuccess: (res) => {
      setPubKey(res.data.data.key);
    },
  });

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

        setIsAuthChecked(true);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userInfo) {
      httpAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userInfo.idToken}`;
      mutateWallet.mutate(0);
    }
  }, [userInfo]);

  useEffect(() => {
    const connection = new Connection(SOLANA_CHAIN);
    setConnection(connection);
  }, []);

  useEffect(() => {
    if (isAuthChecked && !isUserLoggedIn) {
      router("/auth");
    }
  }, [isAuthChecked, isUserLoggedIn, router]);

  if (!isAuthChecked) return <EntireScreenLoader />;

  return (
    <Fragment>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="w-full">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </Fragment>
  );
};

export default HomeLayout;
