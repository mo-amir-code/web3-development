import { tokens } from "@/util/data";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TokenFieldType = {
  token: string;
  onChange: Function;
  amount: number;
  onInAmountChange?: Function;
  isOutputField?: boolean;
  maxFunc?: Function
};

const TokenFIeld = ({
  isOutputField,
  amount,
  token,
  onChange,
  onInAmountChange,
  maxFunc,
}: TokenFieldType) => {
  return (
    <div className="flex items-center justify-between p-2 gap-2 border rounded-md">
      <Input
        type="tel"
        placeholder="0"
        disabled={isOutputField ? true : false}
        autoFocus
        value={amount}
        maxFunc={maxFunc}
        onChange={(e) => {
          if (onInAmountChange) {
            onInAmountChange(e.target.value);
          }
        }}
      />

      <div>
        <Select
          onValueChange={(e) => {
            onChange(e);
          }}
          value={token}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Token" />
          </SelectTrigger>
          <SelectContent>
            {tokens.map((t) => (
              <SelectItem key={t.mint} value={t.mint}>
                <span className="rounded-full overflow-hidden">
                  <img src={t.logoURI} alt="" className="w-8 aspect-square" />
                </span>
                {t.symbol}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TokenFIeld;
