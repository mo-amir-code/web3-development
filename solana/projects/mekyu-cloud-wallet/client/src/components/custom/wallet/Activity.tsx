import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypographyP } from "@/components/ui/typography";
import {
  handleToGetActivities,
  handleToGetSingleTokenInformation,
} from "@/lib/queries";
import type {
  AxiosResponseType,
  TransactionResponseType,
} from "@/types/server";
import { useQuery } from "@tanstack/react-query";
import { EntireScreenLoader } from "../Loader";
import { useCallback, useEffect, useState } from "react";
import { ENVIRONMENT } from "@/config/secrets";
import { amountToToken } from "@/lib/utils";
import toast from "react-hot-toast";

const Activity = () => {
  const { data, isLoading, isError } = useQuery<
    AxiosResponseType<{
      transactions: TransactionResponseType[];
    }>
  >({ queryKey: ["activities"], queryFn: handleToGetActivities });

  return (
    <div className="space-y-1 max-h-[30vh] overflow-y-auto">
      {isLoading ? (
        <EntireScreenLoader className="absolute" />
      ) : isError ? (
        "Something went wrong..."
      ) : (
        data?.data.data.transactions.map((t) => <Act key={t.id} {...t} />)
      )}
    </div>
  );
};

export default Activity;

export const Act: React.FC<TransactionResponseType> = ({
  toPubKey,
  status,
  amount,
  tokenMint,
}) => {
  const [tokenData, setTokenData] = useState<any>(null);
  const chainId = ENVIRONMENT === "development" ? 3 : 1;

  const handleToGetMintInfo = async (chainId: 1 | 3, mintAddress: string) => {
    return await handleToGetSingleTokenInformation({
      chainId,
      tokenMintAddress: mintAddress,
    });
  };

  const { data, isSuccess } = useQuery<{ data: any }>({
    queryKey: ["activity" + tokenMint, chainId, tokenMint],
    queryFn: () => handleToGetMintInfo(chainId, tokenMint),
  });

  const handleToCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(toPubKey);
      toast.success("Receiver address copied");
    } catch (error) {
      console.error(error);
      toast.error("Receiver address copied");
    }
  }, [toast, toPubKey]);

  useEffect(() => {
    if (!isSuccess) return;

    const tokens = amountToToken(amount.toString(), data.data.decimals);

    const info = {
      name: data?.data?.name,
      symbol: data?.data?.symbol,
      decimals: data?.data?.decimals,
      tokens,
      logoUri: data?.data?.logoUri,
    };

    setTokenData(info);
  }, [isSuccess, data, chainId]);

  return (
    <div
      onClick={() => handleToCopy()}
      className="flex items-center p-4 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer gap-2"
    >
      <Avatar className="w-16 h-16">
        <AvatarImage
          src={tokenData?.logoUri ?? "/question-mark.jpg"}
          alt="mekyu"
        />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>

      <div className="flex-1 flex items-start justify-between">
        <div className="">
          <span>
            <TypographyP
              content={`${status === "SUCCESSED" ? "Sent" : "Failed"} ${
                tokenData?.symbol ?? ""
              }`}
              className="font-semibold text-xl"
            />
          </span>
          <span>
            <TypographyP
              content={`to ${toPubKey.slice(0, 3)}...${toPubKey.slice(-3)}`}
              className="text-muted-foreground text-lg"
            />
          </span>
        </div>
        <div className="">
          <span>
            <TypographyP
              content={`${tokenData?.tokens ?? ""}`}
              className="font-semibold text-xl text-right"
            />
          </span>
          {/* <span className="flex items-center text-red-600">
            <span>-</span>
            <span>
              <TypographyP content="<$0.27" className="text-lg" />
            </span>
          </span> */}
        </div>
      </div>
    </div>
  );
};
