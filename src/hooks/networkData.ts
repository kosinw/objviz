import { useQuery } from "react-query";
import { getNetwork } from "../api/network";

import { useQueryStore } from "../data/query";

export const useNetworkData = () => {
  const [lastQuery] = useQueryStore((store) => [store.lastQuery]);

  const queryInfo = useQuery(
    ["getNetwork", { ...lastQuery, prevQuery: undefined }],
    () => getNetwork(lastQuery),
    {
      staleTime: 180000, // 3 minutes
    }
  );

  return { ...queryInfo };
};