"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { mainTheme } from "@/lib/configs/chakra/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/lib/configs/wagmi";
import { WagmiProvider } from "wagmi";
import { ConnectKitProvider } from "connectkit";

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

const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiProvider>
  );
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider resetCSS theme={mainTheme}>
      <ReactQueryClientProvider>
        <Web3Provider>{children}</Web3Provider>
      </ReactQueryClientProvider>
    </ChakraProvider>
  );
}
