import * as React from "react";

import { Modal, Text, Input, Checkbox, useToasts } from "@geist-ui/react";
import { ArrowRight } from "@geist-ui/react-icons";
import type { CheckboxEvent } from "@geist-ui/react/dist/checkbox/checkbox";

import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import BaseModal, { SharedModalProps } from "./BaseModal";
import { useURIStore, useURIHistoryStore } from "../../data/uri.store";
import { verifyURI } from "../../api/uri.api";

export type WelcomeModalFormData = {
  databaseURI: string;
};

const WelcomeModal: React.FC<SharedModalProps> = ({ setVisible, bindings }) => {
  const defaultValues: WelcomeModalFormData = { databaseURI: "" };

  const [, setToast] = useToasts();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const queryClient = useQueryClient();

  const [showFirstTimeModal, setURIHistoryStore] = useURIHistoryStore(
    (store) => [store.showFirstTimeModal, store.set]
  );

  const [setURIStore] = useURIStore((store) => [store.set]);

  const handleCheckboxChange: React.Dispatch<CheckboxEvent> = (e) => {
    setURIHistoryStore((draft) => {
      draft.showFirstTimeModal = !e.target.checked;
    });
  };

  const handleFormSubmit: SubmitHandler<WelcomeModalFormData> = async (
    data
  ) => {
    const result = await verifyURI(data.databaseURI);

    queryClient.setQueryData(["verifyURI", { uri: data.databaseURI }], result);

    if (result) {
      setURIStore((draft) => {
        draft.currentRecord = data.databaseURI;
      });

      setURIHistoryStore((draft) => {
        draft.records = [data.databaseURI, ...draft.records];
      });

      setToast({ text: `Successfully connected to database!` });

      setVisible(false);
    } else {
      // TODO(kosi): Add error handling crap here
    }
  };

  return (
    <BaseModal bindings={bindings} setVisible={setVisible}>
      <Modal.Content>
        <Text style={{ lineHeight: "30px" }} h3>
          Hello, welcome to the OpenX in-house database object visualizer tool!
          👋
        </Text>
        <Text
          p
          style={{
            lineHeight: "26px",
            marginTop: "1.2rem",
            marginBottom: "1.2rem",
          }}
        >
          It seems like this is your first time using this tool. Please enter a
          PostgreSQL URI to connect to the database. This tool displays database
          objects and their relationships through a network structure.
        </Text>
        <Input
          iconClickable
          {...register("databaseURI")}
          iconRight={<ArrowRight />}
          onIconClick={handleSubmit(handleFormSubmit)}
          width="100%"
          placeholder="Enter database URI..."
        />
        <div style={{ marginTop: "1.6rem" }}>
          <Checkbox
            initialChecked={!showFirstTimeModal}
            onChange={handleCheckboxChange}
            size="medium"
          >
            Don't show this message again.
          </Checkbox>
        </div>
      </Modal.Content>
      <Modal.Action passive onClick={() => setVisible(false)}>
        Cancel
      </Modal.Action>
      <Modal.Action onClick={handleSubmit(handleFormSubmit)}>
        Submit
      </Modal.Action>
    </BaseModal>
  );
};

export default WelcomeModal;
