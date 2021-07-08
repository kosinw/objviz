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

// TODO(kosi): Throw errors if necessary
export const verifyURI = async (uri: string | null): Promise<boolean> => {
  if (!uri) {
    return false;
  }

  const response = await axios.get<VerifyURIResponse>("/api/verifyURI", {
    params: { uri },
  });

  return response.data.success;
};
