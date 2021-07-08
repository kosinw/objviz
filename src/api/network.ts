import axios from "axios";

export type GetNetworkResponse = {
  [x: number]: {
    deleted: "0" | "1";
    id: number;
    name: string;
    pointers_from: Array<number | null>;
    status: string;
    type: string;
    type_full?: string;
  };
};

export type GetNetworkRequest = {
  type: string;
  id: number;
  depthLimit: number;
  uri: string;
};

// TODO(kosi): Throw errors if necessary
export const getNetwork = async (
  params: GetNetworkRequest | null
): Promise<GetNetworkResponse | null> => {
  if (!params) {
    return null;
  }

  const response = await axios.get<GetNetworkResponse>("/api/getNetwork", {
    params,
  });

  return response.data;
};
