import {
  MutationState,
  useMutationState,
  useQuery,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { queryKeys } from "@/http/queryKeys";
import { cryptoChangeService } from "@/http/services";
import { IPayloadResponse } from "@/lib/types/Payload";

export const usePaymentById = (id: string | null) => {
  const paymentsMutationState = useMutationState<
    MutationState<IPayloadResponse>
  >({
    filters: { mutationKey: ["useCreatePayment"] },
  });
  const paymentFromState = useMemo(
    () =>
      paymentsMutationState
        .map((item) => item.data)
        .find((payment) => payment?.id === id),
    [paymentsMutationState, id],
  );

  const { data, ...rest } = useQuery({
    queryKey: [queryKeys.usePaymentById],
    queryFn: () => cryptoChangeService.getPaymentById(id!),
    enabled: !!id && !paymentFromState,
  });

  const payment = useMemo(
    () => (paymentFromState ? paymentFromState : data),
    [data, paymentFromState],
  );

  return { payment, ...rest };
};
