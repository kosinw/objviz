import * as React from "react";

import { Modal, Text, Input, Checkbox } from "@geist-ui/react";
import { ArrowRight } from "@geist-ui/react-icons";
import type { CheckboxEvent } from "@geist-ui/react/dist/checkbox/checkbox";

import BaseModal, { SharedModalProps } from "./BaseModal";
import { useURIStore, useURIHistoryStore } from "../../data/uri";
import { UseURIFormData, useURIForm } from "../../hooks/uriForm";

const WelcomeModal: React.FC<SharedModalProps> = ({ setVisible, bindings }) => {
  const [showFirstTimeModal, setURIHistoryStore] = useURIHistoryStore(
    (store) => [store.showFirstTimeModal, store.set]
  );

  const [currentRecord] = useURIStore((store) => [store.uri]);

  const defaultValues: UseURIFormData = { databaseURI: currentRecord || "" };

  const handleCheckboxChange: React.Dispatch<CheckboxEvent> = (e) => {
    setURIHistoryStore((draft) => {
      draft.showFirstTimeModal = !e.target.checked;
    });
  };

  const { register, submit } = useURIForm({
    defaultValues,
    afterSuccess: () => setVisible(false),
  });

  return (
    <BaseModal bindings={bindings} setVisible={setVisible}>
      <Modal.Content>
        <Text style={{ lineHeight: "30px", textAlign: "center" }} h3>
          Welcome! 👋
        </Text>
        <Text
          p
          style={{
            lineHeight: "26px",
            marginTop: "1.2rem",
            marginBottom: "1.2rem",
          }}
        >
          Please enter a PostgreSQL URI to connect to the database. This tool
          displays database objects and their relationships through a network
          structure.
        </Text>
        <Input
          iconClickable
          initialValue={currentRecord || ""}
          {...register("databaseURI", { required: true })}
          iconRight={<ArrowRight />}
          onIconClick={submit}
          width="100%"
          placeholder="Enter database URI..."
        />
        <div style={{ marginTop: "1.6rem" }}>
          <Checkbox
            initialChecked={!showFirstTimeModal}
            onChange={handleCheckboxChange}
            size="medium"
          >
            Stop showing this message automatically.
          </Checkbox>
        </div>
      </Modal.Content>
      <Modal.Action passive onClick={() => setVisible(false)}>
        Close
      </Modal.Action>
      <Modal.Action onClick={submit}>Submit</Modal.Action>
    </BaseModal>
  );
};

export default WelcomeModal;
