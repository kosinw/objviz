import axios from "axios";

export enum VerifyURIResponseErrors {
  InvalidDatabaseCredentials,
  ConnectionDoesNotExist,
}

export type VerifyURIResponse = {
  success: boolean;
  error?: {
    type: VerifyURIResponseErrors;
    message: string;
  };
};

export const verifyURI = async (uri: string | null): Promise<boolean> => {
  if (!uri) {
    return false;
  }

  const response = await axios.get<VerifyURIResponse>("/api/verifyURI", {
    params: { uri },
  });

  return response.data.success;
};
