import { useMutation } from "@tanstack/react-query";
import { cryptoChangeService } from "@/http/services";
import { queryKeys } from "@/http/queryKeys";

export const useLogin = () => {
  return useMutation({
    mutationFn: cryptoChangeService.login,
    mutationKey: [queryKeys.useLogin],
  });
};
