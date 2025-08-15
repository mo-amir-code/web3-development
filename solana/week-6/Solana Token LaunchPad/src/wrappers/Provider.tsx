import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import type { ComponentType } from "../types";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const Provider = ({ children }: ComponentType) => {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Provider;
