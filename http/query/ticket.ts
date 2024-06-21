import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/http/queryKeys";
import { cryptoChangeService } from "@/http/services";
import { PaymentStatus } from "@prisma/client";
import { useConfig } from "@/state/config";

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
