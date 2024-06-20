import { cryptoChangeService } from "@/http/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/http/queryKeys";

export const useCreatePayment = () =>
  useMutation({
    mutationFn: cryptoChangeService.createPayment,
    mutationKey: [queryKeys.useCreatePayment],
  });

export const useUpdatePaymentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cryptoChangeService.updatePaymentStatus,
    mutationKey: [queryKeys.updatePaymentStatus],
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.usePaymentById, variables.paymentId],
      });
    },
  });
};
