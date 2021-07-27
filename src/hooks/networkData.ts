import { useQuery } from "react-query";
import { getNetwork, GetNetworkRequest } from "../api/network";

import { useQueryStore } from "../data/query";

export const useNetworkData = () => {
  const [lastQuery] = useQueryStore((store) => [store.lastQuery]);

  const strippedQuery: GetNetworkRequest | null = !!lastQuery
    ? {
        depthFirst: lastQuery?.depthFirst,
        depthLimit: lastQuery?.depthLimit,
        id: lastQuery?.id,
        objectLimit: lastQuery?.objectLimit,
        type: lastQuery?.type,
        uri: lastQuery?.uri,
      }
    : null;

  const queryInfo = useQuery(
    ["getNetwork", strippedQuery],
    () => getNetwork(strippedQuery),
    {
      staleTime: 180000, // 3 minutes
    }
  );

  return { ...queryInfo };
};
