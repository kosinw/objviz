import { useQuery } from "react-query";
import { getTypes } from "../api/types";

import { useVerifyURI } from "./verifyURI";

export const useTypes = () => {
  const { currentRecord: uri } = useVerifyURI();

  const queryInfo = useQuery(["getTypes", uri], () => getTypes(uri), {
    staleTime: 180000, // 3 minutes
  });

  return { ...queryInfo };
};
