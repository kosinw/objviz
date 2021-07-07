import axios from "axios";

// TODO(kosi): Do better error handling (w/ toasts?)
export const verifyURI = async (uri: string | null): Promise<boolean> => {
  if (!uri) {
    return false;
  }

  try {
    await axios.get("/api/verifyURI", { params: { uri } });
    return true;
  } catch (err) {
    return false;
  }
};
