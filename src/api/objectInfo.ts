import axios from "axios";

export type GetObjectInfoResponse = {
  [x: string]: any;
};

export type GetObjectInfoRequest = {
  uri: string | null;
  id: number;
  type: string;
};

export const getObjectInfo = async (
  params: GetObjectInfoRequest | null
): Promise<GetObjectInfoResponse | null> => {
  if (!params) {
    return null;
  }

  if (!params.uri || !params.id || !params.type) {
    return null;
  }

  const response = await axios.get<GetObjectInfoResponse>(
    "/api/getObjectInfo",
    {
      params,
    }
  );

  return response.data;
};
