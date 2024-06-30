"use client";

import { Flex } from "@chakra-ui/react";
import { MainTable } from "@/components/table/MainTable";
import { useMemo } from "react";
import { useAdminAllTickets } from "@/http/query/ticket";
import { adminHistoryConfigColumn } from "@/components/table/columns";
import { sortPendingFirst } from "@/app/api/_utils/utils";

export const Tickets = () => {
  const { prepareTicketsData } = useAdminAllTickets();
  const ticketsData = useMemo(
    () => sortPendingFirst(prepareTicketsData()),
    [prepareTicketsData],
  );

  const columns = useMemo(() => adminHistoryConfigColumn(), []);
  return (
    <Flex>
      <MainTable data={ticketsData} columns={columns} />
    </Flex>
  );
};
