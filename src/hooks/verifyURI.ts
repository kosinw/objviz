import { useQuery } from "react-query";
import { verifyURI } from "../api/uri";
import { useURIStore } from "../data/uri";

export const useVerifyURI = () => {
  const [currentRecord] = useURIStore((store) => [store.currentRecord]);

  return {
    currentRecord,
    ...useQuery(
      ["verifyURI", { uri: currentRecord }],
      () => verifyURI(currentRecord),
      {
        staleTime: 180000, // 3 minutes
      }
    ),
  };
};
