import { useMutation } from "@tanstack/react-query";
import { cryptoChangeService } from "@/http/services";
import { queryKeys } from "@/http/queryKeys";

export const useCreateToken = () => {
  return useMutation({
    mutationFn: cryptoChangeService.createToken,
    mutationKey: [queryKeys.useCreateToken],
  });
};
