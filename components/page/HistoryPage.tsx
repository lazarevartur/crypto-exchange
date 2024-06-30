"use client";

import { useConfig } from "@/state/config";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Container, Heading } from "@chakra-ui/react";
import { useAllTickets } from "@/http/query/ticket";
import { MainTable } from "@/components/table/MainTable";
import { userHistoryConfigColumn } from "@/components/table/columns";

export const HistoryPage = () => {
  const router = useRouter();
  const { isAuth } = useConfig();

  const { prepareTicketsData } = useAllTickets();
  const ticketsData = useMemo(() => prepareTicketsData(), [prepareTicketsData]);
  const columns = useMemo(() => userHistoryConfigColumn(), []);

  useEffect(() => {
    if (!isAuth) {
      router.push("/");
    }
  }, [isAuth]);

  if (!isAuth) return null;

  return (
    <Container
      as="section"
      maxW="container.xl"
      py="44px"
      display="flex"
      flexDir="column"
    >
      <Heading
        as="h2"
        fontSize="26px"
        fontWeight={600}
        lineHeight="120%"
        color="#212121"
        mb="10px"
      >
        История заказов
      </Heading>
      <MainTable data={ticketsData} columns={columns} />
    </Container>
  );
};
