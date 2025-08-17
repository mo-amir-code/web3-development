import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypographyP } from "@/components/ui/typography";

const Activity = () => {
  return (
    <div className="space-y-1 max-h-[30vh] overflow-y-auto">
      <Act />
      <Act />
      <Act />
      <Act />
    </div>
  );
};

export default Activity;

export const Act = () => {
  return (
    <div className="flex items-center p-4 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer gap-2">
      <Avatar className="w-16 h-16">
        <AvatarImage
          src="https://media.licdn.com/dms/image/v2/D5635AQEIw2oJ1UZqXA/profile-framedphoto-shrink_400_400/B56ZT_UyfrGsAg-/0/1739450427661?e=1755950400&v=beta&t=zzKWu1AW4uUQTLDT2JeZeWTWYR_cKhMxXXyLBc-SHeM"
          alt="mekyu"
        />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>

      <div className="flex-1 flex items-start justify-between">
        <div className="">
          <span>
            <TypographyP content="Sent" className="font-semibold text-xl" />
          </span>
          <span>
            <TypographyP
              content="To ms3fd2....54d3"
              className="text-muted-foreground text-lg"
            />
          </span>
        </div>
        <div className="">
          <span>
            <TypographyP
              content="-$0.27"
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
