import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/http/queryKeys";
import { cryptoChangeService } from "@/http/services";

export const useTicketById = (id: string | null) =>
  useQuery({
    queryKey: [queryKeys.useTicketById, id],
    queryFn: () => cryptoChangeService.getTicketById(id!),
    refetchInterval: 10000,
    enabled: !!id,
  });
