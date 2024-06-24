"use client";

import { Button, Flex } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { MainTable } from "@/components/table/MainTable";
import { useMemo } from "react";
import { useAdminAllTickets } from "@/http/query/ticket";
import { AdminHistoryItem } from "@/lib/types/types";
import { useChangeStatusAdmin } from "@/http/mutation/tickets";

const ActionButton = ({ ticketId }: { ticketId?: string }) => {
  const { mutate, isPending } = useChangeStatusAdmin();
  const onClickAcceptHandler = () => {
    if (!ticketId) return;
    mutate({ ticketId, status: "ACCEPTED" });
  };
  const onClickRejectHandler = () => {
    if (!ticketId) return;
    mutate({ ticketId, status: "REJECTED" });
  };

  return (
    <Flex gap="5px">
      <Button bgColor="green" onClick={onClickAcceptHandler} isLoading={isPending}>
        Accept
      </Button>
      <Button bgColor="red" onClick={onClickRejectHandler} isLoading={isPending}>
        Reject
      </Button>
    </Flex>
  );
};

const adminHistoryConfigColumn = () => {
  const columnHelper = createColumnHelper<AdminHistoryItem>();

  return [
    columnHelper.accessor("ticketId", {}),
    columnHelper.accessor((data) => data, {
      id: "actionButton",
      header: "",
      cell: (info) => {
        const { ticketId, status } = info.getValue();

        if (status !== "PENDING") {
          return null;
        }

        return <ActionButton ticketId={ticketId} />;
      },
    }),
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
