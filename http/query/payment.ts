import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/http/queryKeys";
import { cryptoChangeService } from "@/http/services";

export const usePaymentById = (id: string | null) => {
  const { data: payment, ...rest } = useQuery({
    queryKey: [queryKeys.usePaymentById, id],
    queryFn: () => cryptoChangeService.getPaymentById(id!),
    enabled: !!id,
  });

  return { payment, ...rest };
};
