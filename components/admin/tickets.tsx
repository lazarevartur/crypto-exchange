"use client";

import { Flex } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { MainTable } from "@/components/table/MainTable";
import { useMemo } from "react";
import { useAdminAllTickets } from "@/http/query/ticket";
import { AdminHistoryItem } from "@/lib/types/types";

const adminHistoryConfigColumn = () => {
  const columnHelper = createColumnHelper<AdminHistoryItem>();

  return [
    columnHelper.accessor("paymentId", {}),
    columnHelper.accessor("tokenToPrice", {}),
    columnHelper.accessor("tokenFromPrice", {}),
    columnHelper.accessor("status", {}),
    columnHelper.accessor("createdAt", {}),
    columnHelper.accessor("closedAt", {}),
  ];
};

export const Tickets = () => {
  const { prepareTicketsData } = useAdminAllTickets();
  const ticketsData = useMemo(() => prepareTicketsData(), [prepareTicketsData]);

  const columns = useMemo(() => adminHistoryConfigColumn(), []);
  return (
    <Flex>
      <MainTable data={ticketsData} columns={columns} />
    </Flex>
  );
};
