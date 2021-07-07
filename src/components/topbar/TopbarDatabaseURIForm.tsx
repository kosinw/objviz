import * as React from "react";
import { Input } from "@geist-ui/react";
import { ArrowRight } from "@geist-ui/react-icons";

import styles from "./Topbar.module.css";
import { useURIStore } from "../../data/uri.store";

const TopbarDatabaseURIForm: React.FC = () => {
  const [currentRecord] = useURIStore((state) => [state.currentRecord]);

  return (
    <Input
      className={styles.TopbarDatabaseURIForm}
      placeholder="Enter PostgreSQL database URI..."
      label="Database URI"
      width="100%"
      iconClickable
      initialValue={!!currentRecord ? currentRecord : ""}
      clearable
      iconRight={<ArrowRight />}
    />
  );
};

export default TopbarDatabaseURIForm;
