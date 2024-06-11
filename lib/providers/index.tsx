"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { mainTheme } from "@/lib/configs/chakra/theme";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider resetCSS theme={mainTheme}>
      {children}
    </ChakraProvider>
  );
}
