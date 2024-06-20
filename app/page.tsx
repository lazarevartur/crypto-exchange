import { Flex } from "@chakra-ui/react";
import { CryptoExchange } from "@/components/exchage";
import { CryptoReserves } from "@/components/reserves";
import { ToastsHistory } from "@/components/history/toasts-history";

export default function Home() {
  return (
    <Flex w="100%" flexDir="column" pos="relative">
      <CryptoExchange />
      <CryptoReserves />
      <ToastsHistory />
    </Flex>
  );
}
