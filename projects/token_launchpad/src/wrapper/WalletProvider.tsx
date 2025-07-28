import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import type { ReactNode } from "react";

const WalletProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletProviderWrapper;
