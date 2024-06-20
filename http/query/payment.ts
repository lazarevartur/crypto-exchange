import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/http/queryKeys";
import { cryptoChangeService } from "@/http/services";
import { PaymentStatus } from "@prisma/client";

export const usePaymentById = (id: string | null) => {
  const { data: payment, ...rest } = useQuery({
    queryKey: [queryKeys.usePaymentById, id],
    queryFn: () => cryptoChangeService.getPaymentById(id!),
    enabled: !!id,
  });

  return { payment, ...rest };
};

export const useAllPayments = (status?: PaymentStatus) =>
  useQuery({
    queryKey: [queryKeys.useAllPayments],
    queryFn: () => cryptoChangeService.getAllPayments(status),
  });
