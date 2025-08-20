import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyP } from "@/components/ui/typography";
import { useUserStore } from "@/zustand/UserStore";
import { Copy } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useCallback } from "react";
import toast from "react-hot-toast";

const Receive = () => {
  const { wallet } = useUserStore();

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

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <div className="space-y-2">
        <TypographyP
          content="Receive Address"
          className="text-xl text-center font-medium w-full"
        />
        <QRCodeCanvas value={wallet?.publicKey!} size={200} />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Input value={wallet?.publicKey!} disabled className="w-full" />
        <Button
          className="cursor-copy flex items-center justify-center gap-1"
          onClick={() => handleToCopyPublicKey()}
        >
          <span>
            <Copy />
          </span>
          <span>Copy</span>
        </Button>
      </div>
    </div>
  );
};

export default Receive;
