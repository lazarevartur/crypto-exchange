'use client';
import { Button, Card, Container, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function TicketPage() {
  const router = useRouter();
  return (
    <Container
      as="section"
      maxW="container.xl"
      py="44px"
      display="flex"
      flexDir="column"
    >
      <Card maxW="60%" padding="16px" gap="24px">
        <Flex justifyContent="space-between">
          <Flex flexDirection="column" fontSize="16px">
            <Text>Заявка</Text>
            <Text fontWeight={600}>№191919</Text>
          </Flex>
          <Flex flexDirection="column" fontSize="16px" alignItems="flex-end">
            <Text>20.06.2024</Text>
            <Text>16:08:51</Text>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" px="30px">
          <Flex maxW="40%">Binance Coin BEP-20 80 BNB</Flex>
          <Image src="/swap.svg" alt="swap" boxSize="50px" />
          <Flex maxW="40%">Bitcoin 0,72999514 BTC</Flex>
        </Flex>
        <Button onClick={() => router.push("/")}>Повторить заявку</Button>
      </Card>
    </Container>
  );
}
