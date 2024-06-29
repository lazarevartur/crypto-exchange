import {useMutation, useQueryClient} from "@tanstack/react-query";
import { cryptoChangeService } from "@/http/services";
import { queryKeys } from "@/http/queryKeys";

export const useCreateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cryptoChangeService.createTag,
    mutationKey: [queryKeys.useCreateTag],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.useGetTags],
      });
    },
  });
};

export const useDeleteTagByName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cryptoChangeService.deleteTagByName,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.useGetTags],
      });
    },
  });
};