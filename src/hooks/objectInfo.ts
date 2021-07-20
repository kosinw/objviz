import { useQuery } from "react-query";
import { getObjectInfo } from "../api/objectInfo";
import { useSelectedStore } from "../data/selection";
import { useURIStore } from "../data/uri";

export const useObjectInfo = () => {
  const [uri] = useURIStore((store) => [store.uri]);
  const [id, type] = useSelectedStore((store) => [store.id, store.type]);

  return useQuery(
    ["getObjectInfo", { uri, id, type }],
    () => getObjectInfo({ uri, id, type }),
    { staleTime: 180000 }
  );
};
