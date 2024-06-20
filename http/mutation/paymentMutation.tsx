import { cryptoChangeService } from "@/http/services";
import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/http/queryKeys";

export const useCreatePayment = () =>
  useMutation({
    mutationFn: cryptoChangeService.createPayment,
    mutationKey: [queryKeys.useCreatePayment],
  });

export const useUpdatePaymentStatus = () =>
  useMutation({
    mutationFn: cryptoChangeService.updatePaymentStatus,
    mutationKey: [queryKeys.updatePaymentStatus],
  });
