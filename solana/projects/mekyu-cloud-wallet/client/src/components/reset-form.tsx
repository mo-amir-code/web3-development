import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/zustand/AuthStore";
import { useCallback } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebase";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export function ResetForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { googleAuthProvider } = useAuthStore();

  const handleResetPassword = useCallback(async () => {
    if (!googleAuthProvider) return;
    const tId = toast.loading("Sending...");

    const email =
      (document.getElementById("email") as HTMLInputElement)?.value || "";

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset password email has been sent");
    } catch (error) {
      console.error("Error occurred while sending mail", error);
      toast.error("Erro occurred!");
    } finally {
      toast.dismiss(tId);
    }
  }, [googleAuthProvider, toast, auth]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset your account</CardTitle>
          <CardDescription>
            Enter your email below to reset your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => handleResetPassword()}
                  className="w-full"
                  type="button"
                >
                  Send Mail
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Have an account?{" "}
              <Link to="/auth" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
