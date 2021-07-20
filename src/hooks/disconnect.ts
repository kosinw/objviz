import { useURIStore } from "../data/uri";
import { useToasts } from "@geist-ui/react";
import { useQueryStore } from "../data/query";
import { useSelectedStore } from "../data/selection";

export const useClearQuery = () => {
  const [setQueryStore] = useQueryStore((store) => [store.set]);

  const clearQuery = () => {
    setQueryStore((draft) => {
      draft.lastQuery = null;
    });
  };

  return { clearQuery };
};


export const useDisconnect = () => {
  const [setURIStore] = useURIStore((store) => [store.set]);
  const [setQueryStore] = useQueryStore((store) => [store.set]);
  const [reset] = useSelectedStore((store) => [store.reset]);

  const [, setToast] = useToasts();

  const disconnect = () => {
    setURIStore((draft) => {
      draft.uri = null;
    });

    setQueryStore((draft) => {
      draft.lastQuery = null;
    });

    reset();

    setToast({
      text: "You are now disconnected from the database!",
    });
  };

  return { disconnect };
};
