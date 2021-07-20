import * as React from "react";
import SplitPane from "react-split-pane";
import { useTheme } from "@geist-ui/react";

import styles from "./MainLayout.module.css";
import SidebarLayout from "./sidebar/SidebarLayout";
import TopbarLayout from "./topbar/TopbarLayout";
import ViewerLayout from "./viewer/ViewerLayout";

const MainLayout: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <section className={styles.MainLayoutContainer}>
        <SplitPane
          resizerClassName={
            theme.type === "light" ? "Resizer ResizerLight" : "Resizer"
          }
          minSize={40}
          defaultSize={360}
          maxSize={820}
          split="vertical"
        >
          <SidebarLayout />
          <div className={styles.MainLayoutContentContainer}>
            <section className={styles.MainLayoutTopbarContainer}>
              <TopbarLayout />
            </section>
            <section className={styles.MainLayoutViewerContainer}>
              <ViewerLayout />
            </section>
          </div>
        </SplitPane>
      </section>
    </>
  );
};

export default MainLayout;
