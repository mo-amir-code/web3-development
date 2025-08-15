import { ThemeProvider } from "@/components/theme-provider";
import type { ReactNode } from "react";
import WalletProviderWrapper from "./WalletProvider";
import { Toaster } from "react-hot-toast";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeProvider>
        <WalletProviderWrapper>
          <div className="z-10">{children}</div>
        </WalletProviderWrapper>
        <Toaster position="bottom-right" />
      </ThemeProvider>
    </>
  );
};

export default Provider;
