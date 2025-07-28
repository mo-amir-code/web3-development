import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const Transfer = () => {
  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const wallet = useWallet();
  const { connection } = useConnection();

  const handleTransfer = async () => {
    if (!wallet.publicKey) {
      console.log("Wallet is not connected....");
      return;
    }

    const txn = new Transaction();
    txn.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(toAddress),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    await wallet.sendTransaction(txn, connection);
    console.log("Amount: " + amount * LAMPORTS_PER_SOL + " send successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer</CardTitle>
        <CardDescription>
          This section allows you to send tokens you've created or hold in your
          wallet to other Solana addresses in real-time.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4" >
          <Input
            type="text"
            placeholder="sol address eg: 4ExCkT4h9ri..."
            onChange={(e: any) => {
              setToAddress(e.target.value);
            }}
          />
          <div className="flex items-center justify-center gap-2">
            <Input
              type="text"
              placeholder="eg, 12"
              onChange={(e: any) => {
                setAmount(parseFloat(e.target.value as string));
              }}
            />
            <Button onClick={() => handleTransfer()}>Transfer</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Transfer;
