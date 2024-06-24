import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/http/queryKeys";
import { cryptoChangeService } from "@/http/services";
import { useAccount } from "wagmi";

export const useCheck = () => {
  const { address } = useAccount();

  const { data } = useQuery({
    queryKey: [queryKeys.useCheck, address],
    queryFn: cryptoChangeService.check,
    enabled: !!address,
  });

  return { data };
};
