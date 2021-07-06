import * as React from "react";
import { Modal, Text, Input } from "@geist-ui/react";
import { ArrowRight } from "@geist-ui/react-icons";
import BaseModal, { SharedModalProps } from "./BaseModal";

const WelcomeModal: React.FC<SharedModalProps> = ({ setVisible, bindings }) => {
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
          iconRight={<ArrowRight />}
          width="100%"
          placeholder="Enter database URI..."
        />
      </Modal.Content>
      <Modal.Action passive onClick={() => setVisible(false)}>
        Cancel
      </Modal.Action>
      <Modal.Action>Submit</Modal.Action>
    </BaseModal>
  );
};

export default WelcomeModal;
