import * as React from "react";
import { Modal, Image } from "@geist-ui/react";
import Subtitle from "../common/Subtitle";
import DarkLogo from "../../presskit/images/openx-dark.png";

export interface SharedModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  bindings: {
    open: boolean;
    onClose: () => void;
  };
}

export type BaseModalProps = { children: JSX.Element[] | JSX.Element } & SharedModalProps;

const BaseModal: React.FC<BaseModalProps> = ({ children, bindings }) => {
  return (
    <Modal width="30rem" {...bindings}>
      <Modal.Title>
        <Image width={200} height={80} src={DarkLogo} />
      </Modal.Title>
      <Modal.Subtitle style={{ marginBottom: "0.7rem" }}>
        <Subtitle value="Database Object Visualizer" />
      </Modal.Subtitle>
      {children}
    </Modal>
  );
};

export default BaseModal;
