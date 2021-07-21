import * as React from "react";
import { Modal, Image, useTheme } from "@geist-ui/react";
import Subtitle from "../common/Subtitle";
import DarkLogo from "../../presskit/images/openx-dark.png";
import LightLogo from "../../presskit/images/openx-light.png";

export interface SharedModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  bindings: {
    open: boolean;
    onClose: () => void;
  };
}

export type BaseModalProps = {
  children: JSX.Element[] | JSX.Element;
} & SharedModalProps;

const BaseModal: React.FC<BaseModalProps> = ({ children, bindings }) => {
  const theme = useTheme();

  const Logo = theme.type === "light" ? LightLogo : DarkLogo;

  return (
    <Modal width="35rem" {...bindings}>
      <Modal.Title>
        <Image width={170} height={80} src={Logo} />
      </Modal.Title>
      <Modal.Subtitle style={{ marginBottom: "0.7rem" }}>
        <Subtitle value="Database Object Visualizer" />
      </Modal.Subtitle>
      {children}
    </Modal>
  );
};

export default BaseModal;
