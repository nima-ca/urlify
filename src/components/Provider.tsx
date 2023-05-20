"use client";

import { FunctionComponent, ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { colorModes } from "@src/lib/enum";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider
      themes={[colorModes.DARK, colorModes.LIGHT]}
      attribute="class"
      defaultTheme={colorModes.LIGHT}
    >
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;
