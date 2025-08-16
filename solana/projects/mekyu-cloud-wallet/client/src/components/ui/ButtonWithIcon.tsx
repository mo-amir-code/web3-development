import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Props } from "@/types/layouts";

type ButtonType = {
  name: string;
  isSelected?: boolean;
  className?: string;
  handleOnClick?: Function;
};

const ButtonWithIcon: React.FC<Props & ButtonType> = ({
  children,
  name,
  handleOnClick,
  className = "",
  isSelected = false,
}) => {
  return (
    <Button
      onClick={() => handleOnClick && handleOnClick()}
      variant="outline"
      size="sm"
      className={cn(
        `${
          isSelected
            ? "bg-foreground text-primary-foreground hover:bg-foreground hover:text-primary-foreground"
            : ""
        }`,
        className,
        "cursor-pointer"
      )}
    >
      {children} {name}
    </Button>
  );
};

export default ButtonWithIcon;
