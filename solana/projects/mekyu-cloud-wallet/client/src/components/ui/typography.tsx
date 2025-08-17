import { cn } from "@/lib/utils";
import type { TypographyType } from "@/types/components/ui";

export const TypographyH1: React.FC<TypographyType> = ({
  content,
  className,
}) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
        className
      )}
    >
      {content}
    </h1>
  );
};

export const TypographyH2: React.FC<TypographyType> = ({
  content,
  className,
}) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {content}
    </h2>
  );
};

export const TypographyH3: React.FC<TypographyType> = ({
  content,
  className,
}) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {content}
    </h3>
  );
};

export const TypographyH4: React.FC<TypographyType> = ({
  content,
  className,
}) => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {content}
    </h4>
  );
};

export const TypographyP: React.FC<TypographyType> = ({
  content,
  className,
}) => {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {content}
    </p>
  );
};
