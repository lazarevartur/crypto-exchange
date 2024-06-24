import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/http/queryKeys";
import { cryptoChangeService } from "@/http/services";
import { PaymentStatus } from "@prisma/client";
import { useConfig } from "@/state/config";
import { useCallback } from "react";
import { AdminHistoryItem } from "@/lib/types/types";

export const useTicketById = (id: string | null) =>
  useQuery({
    queryKey: [queryKeys.useTicketById, id],
    queryFn: () => cryptoChangeService.getTicketById(id!),
    refetchInterval: 10000,
    enabled: !!id,
  });

export const useAllTickets = (status?: PaymentStatus) => {
  const { isAuth } = useConfig();
  return useQuery({
    queryKey: [queryKeys.useAllTickets, status],
    queryFn: () => cryptoChangeService.getAllTickets(status),
    refetchInterval: 10000,
    enabled: !!isAuth,
  });
};

export const useAdminAllTickets = (status?: PaymentStatus) => {
  const { isAuth } = useConfig();
  const { data, ...rest } = useQuery({
    queryKey: [queryKeys.useAdminAllTickets, status],
    queryFn: () => cryptoChangeService.getAllTicketsAdmin(status),
    refetchInterval: 5000,
    enabled: !!isAuth,
  });

  const prepareTicketsData = useCallback(
    () =>
      data
        ? data.map<AdminHistoryItem>((ticket) => ({
            ticketId: ticket.id,
            status: ticket.status,
            tokenFromPrice: ticket.tokenFromPrice,
            tokenToPrice: ticket.tokenToPrice,
            closedAt: ticket.closedAt,
            createdAt: ticket.createdAt,
          }))
        : [],
    [data],
  );

  return { data, prepareTicketsData, ...rest };
};
