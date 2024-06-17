"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { mainTheme } from "@/lib/configs/chakra/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQueryClientProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider resetCSS theme={mainTheme}>
      <ReactQueryClientProvider> {children}</ReactQueryClientProvider>
    </ChakraProvider>
  );
}
