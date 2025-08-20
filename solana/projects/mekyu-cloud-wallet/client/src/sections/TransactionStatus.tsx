import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { InputFile } from "./Transfer";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import type {
  AxiosResponseType,
  TransactionResponseType,
} from "@/types/server";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { handleToGetTransaction } from "@/lib/queries";
import { Act } from "@/components/custom/wallet/Activity";

const TransactionStatus = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [txn, setTxn] = useState<TransactionResponseType | null>(null);

  const mutateTransaction = useMutation({
    mutationFn: handleToGetTransaction,
    onSuccess: (
      res: AxiosResponseType<{ transaction: TransactionResponseType }>
    ) => {
      setTxn(res.data.data.transaction);
    },
    onError: (err: { response: AxiosResponseType<any> }) => {
      toast.error(err.response.data.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleOnTransactionRequest = useCallback(async () => {
    const signature = (document.getElementById("signature") as HTMLInputElement)
      .value;

    if (signature.length === 0) {
      toast.error("Enter signature");
      return;
    }

    setIsLoading(true);

    mutateTransaction.mutate(signature);
  }, [toast]);

  return (
    <div className="relative w-full space-y-4">
      <div>
        <TypographyH3 content="Transaction Status" />
        <TypographyP
          content="See transaction status using signature"
          className="-translate-y-5 border-b pb-2"
        />
      </div>

      <div className="space-y-4">
        <InputFile
          name="Txn. signature"
          id="signature"
          placeholder="Signature..."
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          disabled={isLoading}
          onClick={() => handleOnTransactionRequest()}
        >
          {isLoading && <Loader2Icon className="animate-spin" />}
          <span>See Status</span>
        </Button>
      </div>

      {txn ? <Act {...txn} /> : ""}
    </div>
  );
};

export default TransactionStatus;
