import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { SOL_MINT_ADDRESS } from "@/config";
import { handleToTransfer } from "@/lib/queries";
import { amountToToken, tokenToAmount } from "@/lib/utils";
import type { SendTransactionTYpe } from "@/types/lib/queries";
import type {
  AxiosResponseType,
  SendTransactionResponseDataType,
} from "@/types/server";
import { useAppStore } from "@/zustand/AppStore";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const Transfer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [selectedToken, setSelectedToken] = useState<string>(SOL_MINT_ADDRESS);
  const { tokens, setMode } = useAppStore();

  const transferMutation = useMutation({
    mutationFn: handleToTransfer,
    onSuccess: (res: AxiosResponseType<SendTransactionResponseDataType>) => {
      const data = res.data;
      setSignature(data.data.signature);
    },
    onError: (err) => {
      console.log(err);
    },
    onSettled: async (res) => {
      setIsLoading(false);
      toast.dismissAll();
      if (res){
        toast.success(res.data.message);
      }
    },
  });

  const handleToCopy = useCallback(async () => {
    if (!signature) {
      toast.error("Something went wrong!");
      return;
    }

    try {
      await navigator.clipboard.writeText(signature);
      toast.success("Signature copied");
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while copyin signature");
    }
  }, [signature, toast]);

  const handleTokenChange = (token: string) => setSelectedToken(token);

  const handleOnTransfer = useCallback(() => {
    let amount: number | string = (
      document.getElementById("amount") as HTMLInputElement
    ).value;
    const toAddress = (document.getElementById("address") as HTMLInputElement)
      .value;

    if (!amount.length || toAddress.length != 44) {
      toast.error(
        toAddress.length > 0
          ? "Enter correct wallet address"
          : "Enter all required fields carefully!"
      );
      return;
    }

    amount = parseFloat(amount);

    const token = (
      selectedToken.startsWith("So11")
        ? tokens[0]
        : tokens.find((t) => t.mintAddress === selectedToken)
    )!;

    if (amount > amountToToken(token.amount, token.decimals)) {
      toast.error("You don't have enough amount!");
      return;
    }

    setIsLoading(true);
    toast.loading("Sending...");
    try {
      const txnBody: SendTransactionTYpe = {
        amount: BigInt(tokenToAmount(amount, token.decimals)),
        mode: "address",
        programId: token.programId,
        tokenMintAddress: token.mintAddress || SOL_MINT_ADDRESS,
        toPubKey: toAddress,
      };

      transferMutation.mutate(txnBody);
    } catch (error) {
      console.error("Error is occurred while transaction: ", error);
      toast.dismissAll();
      setIsLoading(false);
    }
  }, [toast, tokens, selectedToken, SOL_MINT_ADDRESS, setIsLoading]);

  return (
    <>
      <section className="relative w-full p-6 space-y-4">
        <div>
          <TypographyH3 content="Send" />
          <TypographyP
            content="Transfer funds to other solana wallet"
            className="-translate-y-5 border-b pb-2"
          />
        </div>

        <div className="space-y-4">
          <SelectFile
            id="token"
            name="Select Token"
            value={selectedToken}
            onChage={handleTokenChange}
          />
          <InputFile name="Amount" id="amount" placeholder="e.g. 0.05" />
          <InputFile name="Address" id="address" placeholder="e.g. 2rZ7..." />
        </div>

        <div className="flex items-center gap-2">
          <Button disabled={isLoading} onClick={() => handleOnTransfer()}>
            {isLoading && <Loader2Icon className="animate-spin" />}
            <span>Send</span>
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => setMode("default")}
            variant={"outline"}
          >
            Cancel
          </Button>
        </div>

        {signature ? (
          <div>
            <TypographyP content="Transaction Signature (click to copy)" />
            <div className="flex items-center gap-1">
              <Badge
                variant={"destructive"}
                onClick={() => handleToCopy()}
                className="cursor-copy"
              >
                {signature}
              </Badge>
              <Badge
                variant={"default"}
                onClick={() => setMode("transaction")}
                className=" cursor-pointer "
              >
                see status
              </Badge>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* {!isLoading ? <EntireScreenLoader className="bg-white/5 backdrop-blur-xs absolute" /> : ""} */}
      </section>
    </>
  );
};

export type InputFileType = {
  name: string;
  type?: string;
  placeholder?: string;
  id?: string;
};

export function InputFile({
  name,
  type = "text",
  placeholder,
  id,
}: InputFileType) {
  return (
    <div className="grid w-full  items-center gap-3">
      <Label htmlFor={id}>{name}</Label>
      <Input id={id} type={type} placeholder={placeholder ?? ""} />
    </div>
  );
}

export type SelectFileType = {
  name: string;
  id: string;
  value: string;
  onChage?: Function;
};

export function SelectFile({ name, id, value, onChage }: SelectFileType) {
  const { tokens } = useAppStore();

  return (
    <div className="grid w-full  items-center gap-3">
      <Label htmlFor={id}>{name}</Label>
      <Select
        value={value}
        onValueChange={(v) => {
          if (onChage) onChage(v);
        }}
      >
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue placeholder="Select Token" />
        </SelectTrigger>
        <SelectContent>
          {tokens.map((t) => (
            <SelectItem
              key={t.mintAddress ?? SOL_MINT_ADDRESS}
              value={t.mintAddress ?? SOL_MINT_ADDRESS}
              className=" cursor-pointer"
            >
              <span className="rounded-full overflow-hidden">
                <img
                  src={t.logoUri || "/question-mark.jpg"}
                  alt="?"
                  className="w-8 aspect-square"
                />
              </span>
              {t.symbol + " " + amountToToken(t.amount, t.decimals)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default Transfer;
