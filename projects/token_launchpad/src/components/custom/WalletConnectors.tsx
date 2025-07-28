import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
  WalletDisconnectButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useEffect, useState } from "react";

const WalletConnectors = () => {
  const [balance, setBalance] = useState<number>(0);
  const { connection } = useConnection();
  const wallet = useWallet();

  const getBalance = async () => {
    if (!wallet.publicKey) {
      console.log("Wallet is not exist");
      return;
    }
    const bal = await connection.getBalance(wallet.publicKey);

    setBalance(bal);
  };

  useEffect(() => {
    getBalance();

    if (!wallet.connected) {
      setBalance(0);
    }
  }, [wallet]);

  return (
    <WalletModalProvider>
      <section
        id="wallets"
        className="w-full flex items-center justify-between"
      >
        <WalletDisconnectButton />

        <div className="flex items-center gap-2 justify-end">
          {balance != 0 ? (
            <div className="flex items-center justify-center">
              <span> Sol:</span>{" "}
              <span>
                {" "}
                <strong>{balance}</strong>{" "}
              </span>
            </div>
          ) : (
            ""
          )}

          <WalletMultiButton />
        </div>
      </section>
    </WalletModalProvider>
  );
};

export default WalletConnectors;
