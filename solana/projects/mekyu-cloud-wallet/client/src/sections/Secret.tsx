import AlertDialogModal from "@/components/custom/AlertDialogModal";
import { EntireScreenLoader } from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyP } from "@/components/ui/typography";
import { handleToGetKey } from "@/lib/queries";
import type { AxiosResponseType } from "@/types/server";
import { useMutation } from "@tanstack/react-query";
import { Copy } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const Secret = ({ ref }: { ref: React.RefObject<HTMLDivElement> }) => {
  const [secretKey, setSecretKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutateSecret = useMutation({
    mutationFn: handleToGetKey,
    onSuccess: (res: AxiosResponseType<{ key: string }>) => {
      setSecretKey(res.data.data.key);
    },
    onError: (err: { response: AxiosResponseType<any> }) => {
      toast.error(err.response.data.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleToCopySecretKey = useCallback(async () => {
    if (!secretKey) {
      toast.error("Something went wrong!");
      return;
    }

    try {
      await navigator.clipboard.writeText(secretKey);
      toast.success("Secret key copied");
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while copying key");
    }
  }, [toast, secretKey]);

  const handleUserResponse = useCallback((res: "continue" | "cancel") => {
    if (res === "continue") {
      setShowKey(true);
      mutateSecret.mutate(1);
    }
  }, []);

  return !showKey ? (
    <AlertDialogModal
      name="Show Secret Key"
      title="Reveal Private Key — Proceed with Caution?"
      description="Anyone with your private key can control your assets. Do not save or expose it in insecure places. Only continue if you understand the risks."
      handleResponse={handleUserResponse}
      ref={ref}
    />
  ) : !isLoading && secretKey ? (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <div className="space-y-2">
        <TypographyP
          content="Secret Key"
          className="text-xl text-center font-medium"
        />
        <QRCodeCanvas value={secretKey} size={200} />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Input value={secretKey} disabled />
        <Button
          className="cursor-copy flex items-center justify-center gap-1"
          onClick={() => handleToCopySecretKey()}
        >
          <span>
            <Copy />
          </span>
          <span>Copy</span>
        </Button>
      </div>
    </div>
  ) : (
    <EntireScreenLoader className="absolute" />
  );
};

export default Secret;
