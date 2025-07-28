import { ThemeProvider } from "@/components/theme-provider";
import type { ReactNode } from "react";
import WalletProviderWrapper from "./WalletProvider";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeProvider>
        <WalletProviderWrapper>
          <div className="z-10">{children}</div>
        </WalletProviderWrapper>
      </ThemeProvider>
    </>
  );
};

export default Provider;
