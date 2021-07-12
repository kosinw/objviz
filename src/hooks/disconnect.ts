import { useURIStore } from "../data/uri";
import { useToasts } from "@geist-ui/react";
import { useQueryStore } from "../data/query";
import { useSelectedStore } from "../data/selection";

export const useDisconnect = () => {
  const [setURIStore] = useURIStore((store) => [store.set]);
  const [setQueryStore] = useQueryStore((store) => [store.set]);
  const [setSelected] = useSelectedStore((store) => [store.setSelected]);

  const [, setToast] = useToasts();

  const disconnect = () => {
    setURIStore((draft) => {
      draft.currentRecord = null;
    });

    setQueryStore((draft) => {
      draft.lastQuery = null;
    });

    setSelected("");

    setToast({
      text: "You are now disconnected from the database!",
    });
  };

  return { disconnect };
};
