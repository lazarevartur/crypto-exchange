import {useMutation} from "@tanstack/react-query";
import {cryptoChangeApi} from "@/http/services";

export const useCreatePayment = () => useMutation({
  mutationFn: cryptoChangeApi.createPayment
})