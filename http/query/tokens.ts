import { queryKeys } from "@/http/queryKeys";
import { cryptoChangeService } from "@/http/services";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { IReserveItem } from "@/lib/types/types";

export const useTokens = () => {
  const { data, error } = useQuery({
    queryKey: [queryKeys.useTokens],
    queryFn: cryptoChangeService.getAllTokens,
  });

  const prepareTokens = useCallback(
    () =>
      data
        ? data.map<IReserveItem>(
            ({ id, amount, imageUrl, name, tags, price, min }) => ({
              name,
              amount,
              id,
              type: tags,
              icon: imageUrl,
              price,
              min
            }),
          )
        : [],
    [data],
  );

  return { data, error, prepareTokens };
};
