import { useToasts } from "@geist-ui/react";

import { useQueryClient } from "react-query";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { useURIStore, useURIHistoryStore } from "../data/uri";
import { verifyURI } from "../api/uri";
import { useDisconnect } from "./disconnect";

export type UseURIFormData = {
  databaseURI: string;
};

export type UseURIFormCallback = () => void;

export type UseURIFormArguments = {
  defaultValues: Partial<UseURIFormData>;
  afterSuccess?: UseURIFormCallback;
};

export const useURIForm = ({
  defaultValues,
  afterSuccess,
}: UseURIFormArguments) => {
  const [, setToast] = useToasts();

  const { handleSubmit, ...rest } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const queryClient = useQueryClient();

  const { disconnect } = useDisconnect();

  const [setURIHistoryStore] = useURIHistoryStore((store) => [store.set]);
  const [currentRecord, setURIStore] = useURIStore((store) => [
    store.currentRecord,
    store.set,
  ]);

  const handleFormError: SubmitErrorHandler<UseURIFormData> = (errors) => {
    setToast({
      text: "Error: You must enter a valid PostgreSQL URI.",
      type: "error",
    });
  };

  const handleFormSubmit: SubmitHandler<UseURIFormData> = async (data) => {
    // Disconnect from current database first
    if (currentRecord) {
      disconnect();
    }

    const result = await verifyURI(data.databaseURI);

    queryClient.setQueryData(["verifyURI", { uri: data.databaseURI }], result);

    if (result) {
      setURIStore((draft) => {
        draft.currentRecord = data.databaseURI;
      });

      setURIHistoryStore((draft) => {
        draft.records = [data.databaseURI, ...draft.records];
      });

      setToast({
        text: "You are now connected to the database!",
        type: "success",
      });

      if (!!afterSuccess) {
        afterSuccess();
      }
    } else {
      // TODO(kosi): Add error handling crap here
      setToast({
        text: "Error: There was an error connecting to the database.",
        type: "error",
      });
    }
  };

  const submit = handleSubmit(handleFormSubmit, handleFormError);

  return { submit, ...rest };
};
