import { ThemeProvider } from "@/components/theme-provider";
import type { ReactNode } from "react";

const ThemeUIProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
};

export default ThemeUIProvider;
