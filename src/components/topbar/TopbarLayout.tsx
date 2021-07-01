import * as React from "react";

import styles from "./Topbar.module.css";
import TopbarDatabaseURIForm from "./TopbarDatabaseURIForm";
import TopbarRightGroup from "./TopbarRightGroup";

const TopbarLayout: React.FC = () => {
  return (
    <header className={styles.TopbarLayout}>
      <div className={styles.TopbarLayoutContentContainer}>
        <div className={styles.TopbarLayoutURIFormContainer}>
          <TopbarDatabaseURIForm />
        </div>
        <div className={styles.TopbarLayoutRightGroupContainer}>
          <TopbarRightGroup />
        </div>
      </div>
    </header>
  );
};

export default TopbarLayout;
