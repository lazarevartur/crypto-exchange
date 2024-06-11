import { Flex } from "@chakra-ui/react";
import { CryptoExchange } from "@/components/exchage";
import { CryptoReserves } from "@/components/reserves";

export default function Home() {
  return (
    <Flex w="100%" flexDir="column">
      <CryptoExchange />
      <CryptoReserves />
    </Flex>
  );
}
