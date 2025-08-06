import { alchemyConnections, devnetTokens as tokens } from "@/util/data";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import TokenFIeld from "./TokenFIeld";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  convertAmountIntoRaw,
  convertRawAmountIntoHumanReadableForm,
} from "@/util/service";
import toast from "react-hot-toast";
import swapIcon from "@/assets/swap-icon.svg";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { VersionedTransaction } from "@solana/web3.js";

const Swap = () => {
  const [inputMint, setInputMint] = useState<string>(tokens[0].mint);
  const [outputMint, setOutputMint] = useState<string>(tokens[1].mint);
  const [inAmount, setInAmount] = useState<number>(1);
  const [outAmount, setOutAmount] = useState<number>(0);

  const wallet = useWallet();
  const { connection } = useConnection();

  const handleSwapToken = async () => {
    if (!wallet || !wallet.publicKey) {
      return;
    }

    const quoteResponse = await fetchQuote();
    console.log(quoteResponse)

    const res = await axios.post("https://lite-api.jup.ag/swap/v1/swap", {
      quoteResponse,
      userPublicKey: wallet.publicKey.toString(),
      network: "devnet",

      // ADDITIONAL PARAMETERS TO OPTIMIZE FOR TRANSACTION LANDING
      // See next guide to optimize for transaction landing
      dynamicComputeUnitLimit: true,
      dynamicSlippage: true,
      prioritizationFeeLamports: {
        priorityLevelWithMaxLamports: {
          maxLamports: 1000000,
          priorityLevel: "veryHigh",
        },
      },
    });

    const swapResponse = res.data;

    const transactionBase64 = swapResponse.swapTransaction;
    const transaction = VersionedTransaction.deserialize(
      Buffer.from(transactionBase64, "base64")
    );
    console.log(transaction);

    const transactionBinary = transaction.serialize();
    console.log(transactionBinary);

    try {
      const latestBlockhash = await connection.getLatestBlockhash();
      const signature = await wallet.sendTransaction(transaction, connection);

      await connection.confirmTransaction(
        {
          signature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        "finalized"
      );

      console.log("Swap tx signature:", signature);
    } catch (error) {
      console.log(error);
    }

    // const signature = await connection.sendRawTransaction(transactionBinary, {
    //   maxRetries: 2,
    //   skipPreflight: true,
    // });

    // console.log(signature)

    // const confirmation = await connection.confirmTransaction({signature,}, "finalized");
  };

  const handleSwapCurrencies = () => {
    let curr = inputMint;
    setInputMint(outputMint);
    setOutputMint(curr);
  };

  const fetchQuote = async () => {
    const token = tokens.find((t) => t.mint === inputMint);
    const outToken = tokens.find((t) => t.mint === outputMint);

    if (!token || !outToken) {
      console.error("Something went wrong!");
      toast.error("Something went wrong!");
      return;
    }

    const uri = `https://lite-api.jup.ag/swap/v1/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${convertAmountIntoRaw(
      inAmount,
      token.decimals
    )}&slippageBps=50&restrictIntermediateTokens=true&network=devnet`;
    const res = await axios.get(uri);

    const outAmount = parseInt(res.data.outAmount);
    setOutAmount(
      convertRawAmountIntoHumanReadableForm(outAmount, outToken.decimals)
    );
    return res.data;
  };

  useEffect(() => {
    if (inAmount > 0) fetchQuote();
  }, [inputMint, outputMint, inAmount]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Swap</CardTitle>
        <CardDescription>
          Enables users to instantly exchange one token for another at the best
          available rate, streamlining the conversion process in a single step.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <TokenFIeld
            amount={inAmount}
            onInAmountChange={setInAmount}
            onChange={setInputMint}
            token={inputMint}
          />

          <div className="flex items-center justify-center">
            <button
              className="bg-white rounded-full cursor-pointer"
              onClick={() => handleSwapCurrencies()}
            >
              <img src={swapIcon} className="w-10 aspect-square" />
            </button>
          </div>

          <TokenFIeld
            amount={outAmount}
            onChange={setOutputMint}
            token={outputMint}
            isOutputField
          />
          <Button onClick={() => handleSwapToken()}>Swap Now</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Swap;
