"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTicketById } from "@/http/query/ticket";
import dayjs from "dayjs";
import { Button, Card, Container, Flex, Image, Text } from "@chakra-ui/react";

const statusMapping = {
  ACCEPTED: <Text color="#fcbf11">Ваша заявка успешно обработана!</Text>,
  PENDING: <Text color="#fcbf11">В обработке</Text>,
  REJECTED: (
    <Flex flexDirection="column">
      <Text>Ваша заявка отклонена!</Text>
      <Text color="#fcbf11">
        <Text as="span">Причина:</Text> Оплата не поступила
      </Text>
    </Flex>
  ),
};

export const TicketPage = () => {
  const router = useRouter();

  const params = useSearchParams();
  const ticketId = params.get("id");
  const { data: ticket } = useTicketById(ticketId);

  if (!ticket) return null;

  const fromDate = dayjs(ticket?.createdAt).format("DD.MM.YYYY");
  const fromDateTime = dayjs(ticket?.createdAt).format("HH:mm:ss");

  return (
    <Container
      as="section"
      maxW="container.xl"
      py="44px"
      display="flex"
      flexDir="column"
    >
      <Flex mb="15px">
        <Text fontWeight={600}>Статус: {statusMapping[ticket.status]} </Text>
      </Flex>
      <Card maxW="60%" padding="16px" gap="24px">
        <Flex justifyContent="space-between">
          <Flex flexDirection="column" fontSize="16px">
            <Text>Заявка</Text>
            <Text fontWeight={600}>ID: {ticket?.id}</Text>
          </Flex>
          <Flex flexDirection="column" fontSize="16px" alignItems="flex-end">
            <Text>{fromDate}</Text>
            <Text>{fromDateTime}</Text>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" px="30px">
          <Flex maxW="40%">
            {ticket?.payment?.fromToken?.name} {ticket?.payment?.fromAmount}{" "}
            {ticket?.payment?.fromToken?.symbol}
          </Flex>
          <Image src="/swap.svg" alt="swap" boxSize="50px" />
          <Flex maxW="40%">
            {ticket?.payment?.toToken?.name} {ticket?.payment?.toAmount}{" "}
            {ticket?.payment?.toToken?.symbol}
          </Flex>
        </Flex>
        <Button onClick={() => router.push("/")}>Повторить заявку</Button>
      </Card>
    </Container>
  );
};
