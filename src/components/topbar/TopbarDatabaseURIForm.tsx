import * as React from "react";
import { Input } from "@geist-ui/react";
import { ArrowRight } from "@geist-ui/react-icons";
import { useModal } from "@geist-ui/react";

import styles from "./Topbar.module.css";
import WelcomeModal from "../modals/WelcomeModal";

const TopbarDatabaseURIForm: React.FC = () => {
  const { setVisible, bindings } = useModal();

  return (
    <>
      <Input
        className={styles.TopbarDatabaseURIForm}
        placeholder="Enter PostgreSQL database URI..."
        label="Database URI"
        width="100%"
        iconClickable
        clearable
        onIconClick={() => setVisible(true)}
        iconRight={<ArrowRight />}
      />
      <WelcomeModal setVisible={setVisible} bindings={bindings} />
    </>
  );
};

export default TopbarDatabaseURIForm;
