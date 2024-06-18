import {useMutation} from "@tanstack/react-query";
import {cryptoChangeService} from "@/http/services";

export const useCreatePayment = () => useMutation({
  mutationFn: cryptoChangeService.createPayment
})