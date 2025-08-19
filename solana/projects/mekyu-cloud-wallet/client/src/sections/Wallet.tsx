import { Activity, Tokens } from "@/components/custom/wallet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { ENVIRONMENT } from "@/config/secrets";
import {
  handleToGetTokenBalances,
  handleToGetTotalBalance,
} from "@/lib/queries";
import type { TokenMetadataType } from "@/types/components";
import { useAppStore } from "@/zustand/AppStore";
import { useAuthStore } from "@/zustand/AuthStore";
import { useUserStore } from "@/zustand/UserStore";
import axios from "axios";
import { RectangleEllipsis, Wallet as WalletIcon } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Wallet = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const { userInfo } = useAuthStore();
  const { wallet, connection } = useUserStore();
  const { setTokens } = useAppStore();

  const handleToCopyPublicKey = useCallback(async () => {
    if (!wallet) {
      toast.error("Something went wrong!");
      return;
    }

    try {
      await navigator.clipboard.writeText(wallet.publicKey);
      toast.success("Wallet address copied");
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while copyin text");
    }
  }, [wallet, toast]);

  const handleToFetchTokens = useCallback(async () => {
    const chainId = ENVIRONMENT === "development" ? 3 : 1;
    try {
      const res = await axios.post(
        `https://api.phantom.app/tokens/v1?isSolCompressedTokensEnabled=true`,
        {
          addresses: [
            {
              address: "2rZ7kKwVUDLwGgBJCYzHkcJXunPSnsVLL9hbBhb1Nnwn",
              chainId: `solana:10${chainId}`,
            },
          ],
        }
      );

      let tokens: TokenMetadataType[] = res?.data?.tokens?.map((t: any) => {
        return {
          type: t.type,
          amount: t.data.amount,
          decimals: t.data.decimals,
          logoUri: t.data.logoUri,
          name: t.data.name,
          symbol: t.data.symbol,
          mintAddress: t.data?.mintAddress || null,
          programId: t.data?.programId || null,
        };
      });

      if (ENVIRONMENT !== "development") {
        const balanceObj: {
          walletAddress: string;
          chainId: 1 | 3;
        } = {
          walletAddress: wallet?.publicKey!,
          chainId: 1,
        };

        const balance = await handleToGetTotalBalance(balanceObj);
        setBalance(balance?.data?.totalValueUsdStringCurrent || "0.00");

        const balances = await handleToGetTokenBalances(balanceObj);

        tokens =
          balances?.data?.items?.map((t: any, idx: number) => {
            return {
              ...tokens[idx],
              price: t?.price?.price || null,
            };
          }) || tokens;
      }

      setTokens(tokens);
    } catch (error) {
      console.error(error);
    }
  }, [wallet, ENVIRONMENT]);

  useEffect(() => {
    if (connection && wallet) handleToFetchTokens();
  }, [connection, wallet]);

  return (
    <section className="w-full rounded-lg min-h-[35rem] shadow-lg bg-primary-foreground/30">
      {/* User Profile Information */}
      <div className="p-8 rounded-lg bg-primary-foreground shadow-lg space-y-7">
        {/* Profile */}
        <div className="flex items-center gap-4">
          {/* Avatara */}
          <Avatar className="w-20 h-20">
            <AvatarImage src={userInfo?.photoURL!} alt="mekyu" />
            <AvatarFallback className="rounded-lg">
              {userInfo?.name?.split(" ")[0]}
            </AvatarFallback>
          </Avatar>

          <TypographyH2
            content={`Welcome back, ${userInfo?.name?.split(" ")[0]}!`}
            className="text-shadow-foreground"
          />
        </div>

        {/* Wallet Balance */}
        {/* MekYu Account Assests */}
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="">
              <WalletIcon className="w-5" />
            </span>
            <span>
              <TypographyP
                content="MekYu Account Assests"
                className="text-sm font-medium"
              />
            </span>
          </div>

          {/* Balance And Address */}
          <div className="flex items-center justify-between">
            {/* Balance */}
            <div className="flex-1 flex items-end gap-1">
              <span>
                <TypographyP
                  content={`$${balance ?? "-"}`}
                  className="text-7xl font-semibold"
                />
              </span>
              <span>
                <TypographyP
                  content={`USD`}
                  className="text-4xl font-bold -translate-y-2 text-muted-foreground"
                />
              </span>
            </div>

            {/* Wallet Public Address */}
            <div>
              <ButtonWithIcon
                name="Your Wallet Address"
                handleOnClick={() => handleToCopyPublicKey()}
                className="bg-muted-foreground/5 cursor-pointer rounded-full text-muted-foreground"
              >
                <RectangleEllipsis />
              </ButtonWithIcon>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button className="flex-1 cursor-pointer">Send</Button>
            <Button className="flex-1 cursor-pointer" variant={"outline"}>
              Receive
            </Button>
            {/* <Button className="flex-1" variant={"outline"} >Send</Button> */}
          </div>
        </div>
      </div>

      {/* User's Wallet Data */}
      <div className="p-6">
        <Tabs defaultValue="tokens" className="w-full">
          <TabsList>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            {/* <TabsTrigger value="nfts">NFTs</TabsTrigger> */}
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="tokens">
            <Tokens />
          </TabsContent>
          {/* <TabsContent value="nfts">Change your password here.</TabsContent> */}
          <TabsContent value="activity">
            <Activity />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default memo(Wallet);
