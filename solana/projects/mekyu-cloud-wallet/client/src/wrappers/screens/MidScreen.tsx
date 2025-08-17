import { cn } from "@/lib/utils";
import type { Props } from "@/types/layouts";

type MidScreenType = {
  className?: string;
};

const MidScreen: React.FC<Props & MidScreenType> = ({
  children,
  className = "",
}) => {
  return (
    <div className={cn("max-w-4xl mx-auto w-full", className)}>{children}</div>
  );
};

export default MidScreen;
