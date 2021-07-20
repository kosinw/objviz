import * as React from "react";
import { useMeasure } from "react-use";
import { useClientStore } from "../../data/client";

import styles from "./Topbar.module.css";
import TopbarDatabaseURIForm from "./TopbarDatabaseURIForm";
import TopbarRightGroup from "./TopbarRightGroup";

const TopbarLayout: React.FC = () => {
  const [ref, { height }] = useMeasure<HTMLElement>();
  const [set] = useClientStore((store) => [store.set]);

  React.useLayoutEffect(() => {
    set((draft) => {
      draft.topbarHeight = height;
    });
  }, [height, set, ref]);

  return (
    <header ref={ref} className={styles.TopbarLayout}>
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
