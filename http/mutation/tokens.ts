import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cryptoChangeService } from "@/http/services";
import { queryKeys } from "@/http/queryKeys";

export const useCreateToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cryptoChangeService.createToken,
    mutationKey: [queryKeys.useCreateToken],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.useTokens],
      });
    },
  });
};

export const useUpdateTokenById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cryptoChangeService.updateTokenById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.useTokens],
      });
    },
  });
};


export const useDeleteTokenById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cryptoChangeService.deleteTokenById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.useTokens],
      });
    },
  });
};

