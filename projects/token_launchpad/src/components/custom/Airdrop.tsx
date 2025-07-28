import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const Airdrop = () => {
  const [airdropAddress, setAirdropAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const { connection } = useConnection();

  const handleAirdrop = async () => {
    const airAddress = new PublicKey(airdropAddress);

    await connection.requestAirdrop(airAddress, amount * LAMPORTS_PER_SOL);

    console.log("Airdroped sol successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Airdrop</CardTitle>
        <CardDescription>
          This feature allows you to run custom airdrops to reward early users,
          run promotions, or bootstrap adoption.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="sol address eg: 4ExCkT4h9ri..."
            onChange={(e: any) => {
              setAirdropAddress(e.target.value);
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
            <Button onClick={() => handleAirdrop()}>Airdrop</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Airdrop;
