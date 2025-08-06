import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
  WalletDisconnectButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
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
        className="w-full flex sm:items-center max-sm:gap-4 justify-between max-sm:flex-col"
      >
        <div>
          <WalletDisconnectButton />
        </div>

        <div className="flex max-sm:flex-row-reverse items-center gap-2 justify-end">
          {wallet.connected ? (
            <div className="flex items-center justify-center">
              <span> Sol:</span>{" "}
              <span>
                {" "}
                <strong>
                  {balance === 0 ? 0 : (balance / LAMPORTS_PER_SOL).toFixed(4)}
                </strong>{" "}
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
