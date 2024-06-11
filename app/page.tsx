import { Flex } from "@chakra-ui/react";
import { CryptoExchange } from "@/components/exchage";

export default function Home() {
  return (
    <Flex w='100%'>
      <CryptoExchange />
    </Flex>
  );
}
