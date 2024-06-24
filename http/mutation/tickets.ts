import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cryptoChangeService } from "@/http/services";
import { queryKeys } from "@/http/queryKeys";

export const useChangeStatusAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cryptoChangeService.changeTicketStatusAdmin,
    mutationKey: [queryKeys.useChangeStatusAdmin],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.useTokens],
      });
    },
  });
};
