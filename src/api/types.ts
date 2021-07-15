import axios from "axios";

export type GetTypesInfoResponse = Array<string>;

export const getTypes = async (
  uri: string | null
): Promise<GetTypesInfoResponse | null> => {
  if (!uri) {
    return null;
  }

  const response = await axios.get<GetTypesInfoResponse>("/api/getTypes", {
    params: { uri },
  });

  return response.data;
};
