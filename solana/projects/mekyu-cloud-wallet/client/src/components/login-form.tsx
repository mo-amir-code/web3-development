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
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  type UserCredential,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import type { ManualUserType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { handleToAuth } from "@/lib/queries";
import { httpAxios } from "@/lib/axios";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { googleAuthProvider, setUserInfo, setUserStatus } = useAuthStore();
  const router = useNavigate();
  const mutateAuth = useMutation({
    mutationFn: handleToAuth,
    onSuccess: (_res) => {
      router("/");
      toast.success("Authentication successfull");
    },
  });

  const handleAuth = useCallback(
    (res: UserCredential & any) => {
      const { user } = res;
      const userInfo: ManualUserType = {
        idToken: user.accessToken,
        email: user.email!,
        name: user.displayName,
        phone: user.phoneNumber,
        photoURL: user.photoURL,
      };

      setUserInfo(userInfo);
      setUserStatus(true);
      httpAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userInfo.idToken}`;
      mutateAuth.mutate();
    },
    [setUserInfo, setUserStatus, mutateAuth, toast, router, httpAxios]
  );

  const handleGoogleAuth = useCallback(async () => {
    if (!googleAuthProvider) return;
    const tId = toast.loading("Authenticating...");

    try {
      const result = (await signInWithPopup(
        auth,
        googleAuthProvider
      )) as UserCredential;
      handleAuth(result);
    } catch (error) {
      console.error("Error occurred while google authentication", error);
      toast.error("Authentication failed");
    } finally {
      toast.dismiss(tId);
    }
  }, [googleAuthProvider, toast, auth, signInWithPopup]);

  const handleEmailAndPasswordAuth = useCallback(async () => {
    if (!googleAuthProvider) return;
    const tId = toast.loading("Authenticating...");

    const email =
      (document.getElementById("email") as HTMLInputElement)?.value || "";
    const password =
      (document.getElementById("password") as HTMLInputElement)?.value || "";

    try {
      if (!email.length || password.length < 4) {
        toast.error("Enter all required fields carefully!");
        toast.dismiss(tId);
        return;
      }

      let res: any = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Signed Up", res);
      toast.success("Authenticated!");
    } catch (error: any) {
      if (error?.code == "auth/email-already-in-use") {
        try {
          let res = await signInWithEmailAndPassword(auth, email, password);
          console.log("Signed In: ", res);
          toast.success("Authenticated!");
        } catch (error: any) {
          console.error("Error occurred while authentication", error);

          if (error?.code == "auth/invalid-credential") {
            toast.error("Invalid credentials");
          } else {
            toast.error("Authencation failed");
          }
        }
      } else {
        toast.error("Authencation failed");
      }
    } finally {
      toast.dismiss(tId);
    }
  }, [googleAuthProvider, toast, fetchSignInMethodsForEmail, auth]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Authenticate your account</CardTitle>
          <CardDescription>
            Enter your email below to authenticate your account
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
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/auth/reset"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => handleEmailAndPasswordAuth()}
                  className="w-full"
                  type="button"
                >
                  Login
                </Button>
                <Button
                  onClick={() => handleGoogleAuth()}
                  variant="outline"
                  type="button"
                  className="w-full"
                >
                  Continue with Google
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
