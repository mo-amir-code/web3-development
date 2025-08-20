import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypographyP } from "@/components/ui/typography";
import { ENVIRONMENT } from "@/config/secrets";
import { amountToToken } from "@/lib/utils";
import type { TokenMetadataType } from "@/types/components";
import { useAppStore } from "@/zustand/AppStore";

const Tokens = () => {
  const { tokens } = useAppStore();

  return (
    <div className="space-y-1 max-h-[30vh] overflow-y-auto">
      {tokens.map((token, idx: number) => (
        <Token key={token.mintAddress ?? `${token.symbol}-${idx}`} {...token} />
      ))}
    </div>
  );
};

export const Token: React.FC<TokenMetadataType> = (token) => {
  const { amount, decimals, logoUri, name, symbol, price } = token;

  function calculateTokenValue(
    amount: string | number,
    pricePerUnit: number
  ): number {
    return Number(amount) * pricePerUnit;
  }

  return (
    <div className="flex items-center p-4 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer gap-2">
      <Avatar className="w-16 h-16">
        <AvatarImage src={logoUri || "/question-mark.jpg"} alt="mekyu" />
        <AvatarFallback className="rounded-lg">MekYu</AvatarFallback>
      </Avatar>

      <div className="flex-1 flex items-center justify-between">
        <div className="">
          <span>
            <TypographyP
              content={name || "Unknown"}
              className="font-semibold text-xl"
            />
          </span>
          <span>
            <TypographyP
              content={`${amountToToken(amount, decimals)} ${
                symbol || "Unknown"
              }`}
              className="text-muted-foreground text-lg"
            />
          </span>
        </div>
        <div className="">
          <span>
            <TypographyP
              content={
                ENVIRONMENT === "development"
                  ? "-"
                  : "$" +
                    calculateTokenValue(
                      amountToToken(amount, decimals),
                      price!
                    ).toFixed(4)
              }
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

export default Tokens;
