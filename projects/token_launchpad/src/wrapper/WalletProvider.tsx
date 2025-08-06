import { alchemyConnections } from "@/util/data";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import type { ReactNode } from "react";

const WalletProviderWrapper = ({ children }: { children: ReactNode }) => {
  const connection = clusterApiUrl("devnet");  
  // const connection = alchemyConnections.devnet;
  // console.log(connection)

  return (
    <ConnectionProvider endpoint={connection}>
      <WalletProvider wallets={[]} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletProviderWrapper;
