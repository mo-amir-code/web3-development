import { Activity, Tokens } from "@/components/custom/wallet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { RectangleEllipsis, Wallet as WalletIcon } from "lucide-react";

const Wallet = () => {
  return (
    <section className="w-full rounded-lg min-h-[35rem] shadow-lg bg-primary-foreground/30">
      {/* User Profile Information */}
      <div className="p-8 rounded-lg bg-primary-foreground shadow-lg space-y-7">
        {/* Profile */}
        <div className="flex items-center gap-4">
          {/* Avatara */}
          <Avatar className="w-20 h-20">
            <AvatarImage
              src="https://media.licdn.com/dms/image/v2/D5635AQEIw2oJ1UZqXA/profile-framedphoto-shrink_400_400/B56ZT_UyfrGsAg-/0/1739450427661?e=1755950400&v=beta&t=zzKWu1AW4uUQTLDT2JeZeWTWYR_cKhMxXXyLBc-SHeM"
              alt="mekyu"
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>

          <TypographyH2
            content="Welcome back, Mo!"
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
                  content={`$0.00`}
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
                className="bg-muted-foreground/5 rounded-full text-muted-foreground"
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
            <TabsTrigger value="nfts">NFTs</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="tokens">
            <Tokens />
          </TabsContent>
          <TabsContent value="nfts">Change your password here.</TabsContent>
          <TabsContent value="activity">
            <Activity />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Wallet;
