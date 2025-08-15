import { alchemyConnections } from "@/util/data";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
// import { clusterApiUrl } from "@solana/web3.js";
import type { ReactNode } from "react";

const WalletProviderWrapper = ({ children }: { children: ReactNode }) => {
  // const connection = clusterApiUrl("mainnet-beta");  
  const connection = alchemyConnections.mainnet;
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
