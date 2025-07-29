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
import toast from "react-hot-toast";

const Transfer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const wallet = useWallet();
  const { connection } = useConnection();

  const handleTransfer = async () => {
    if (!wallet.publicKey) {
      console.log("Wallet is not connected....");
      return;
    }

    setIsLoading(true);
    const tId = toast.loading("Sending....");
    try {
      const txn = new Transaction();
      txn.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(toAddress),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );
      await wallet.sendTransaction(txn, connection);

      toast.success(amount + " SOL has been sent");
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while transferring!");
    } finally {
      setIsLoading(false);
      toast.dismiss(tId);
    }
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
        <div className="space-y-4">
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
            <Button disabled={isLoading} onClick={() => handleTransfer()}>
              Transfer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Transfer;
