import * as React from "react";
import { Input } from "@geist-ui/react";
import { ArrowRight } from "@geist-ui/react-icons";

import styles from "./Topbar.module.css";

const TopbarDatabaseURIForm: React.FC = () => {
  return (
    <Input
      className={styles.TopbarDatabaseURIForm}
      placeholder="Enter PostgreSQL database URI..."
      label="Database URI"
      width="100%"
      iconClickable
      clearable
      iconRight={<ArrowRight />}
    />
  );
};

export default TopbarDatabaseURIForm;
