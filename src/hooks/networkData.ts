import { useQuery } from "react-query";
import { getNetwork, GetNetworkRequest } from "../api/network";
import { useToasts } from "@geist-ui/react";

import { useQueryStore } from "../data/query";

export const useNetworkData = () => {
  const [lastQuery, setQueryStore] = useQueryStore((store) => [
    store.lastQuery,
    store.set,
  ]);
  const [, setToast] = useToasts();

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
    async () => {
      setToast({
        text: "Sending visualization query to server...",
      });

      const response = await getNetwork(strippedQuery);

      if (!response) {
        return response;
      }
      setToast({
        type: "success",
        text: "Visualization query was successful!",
      });
      return response;
    },
    {
      staleTime: 900000, // 5 minutes
      onError: () => {
        setQueryStore((draft) => {
          if (draft.lastQuery === null) {
            return;
          }

          draft.lastQuery = null;

          setToast({
            type: "error",
            text: "Visualization query was not successful!",
          });
        });
      },
    }
  );

  return { ...queryInfo };
};
