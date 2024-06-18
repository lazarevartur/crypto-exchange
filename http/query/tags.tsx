import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/http/queryKeys";
import { cryptoChangeService } from "@/http/services";
import { useCallback } from "react";

export const useGetTags = () => {
  const { data } = useQuery({
    queryKey: [queryKeys.useGetTags],
    queryFn: cryptoChangeService.getAllTokenTags,
  });

  const prepareTags = useCallback(
    () => (data ? data.map(({ name }) => name) : [data]),
    [data],
  );

  return {
    prepareTags,
  };
};
