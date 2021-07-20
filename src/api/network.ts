import axios from "axios";

export type GetNetworkResponse = {
  network: {
    [x: number]: {
      deleted: "0" | "1";
      id: number;
      name: string;
      pointers_from: Array<number | null>;
      type: string;
    };
  };
  sqlQueries: {
    [x: string]: boolean;
  };
};

export type GetNetworkRequest = {
  type: string;
  id: number;
  depthLimit: number;
  uri: string;
};

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
