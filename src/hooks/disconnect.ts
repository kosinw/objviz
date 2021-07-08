import { useURIStore } from "../data/uri";
import { useToasts } from "@geist-ui/react";
import { useQueryStore } from "../data/query";

export const useDisconnect = () => {
  const [setURIStore] = useURIStore((store) => [store.set]);
  const [setQueryStore] = useQueryStore((store) => [store.set]);
  const [, setToast] = useToasts();

  const disconnect = () => {
    setURIStore((draft) => {
      draft.currentRecord = null;
    });

    setQueryStore((draft) => {
      draft.lastQuery = null;
    });

    setToast({
      text: "You are now disconnected from the database!",
    });
  };

  return { disconnect };
};
