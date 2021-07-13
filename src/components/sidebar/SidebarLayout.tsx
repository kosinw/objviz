import * as React from "react";
import { Grid } from "@geist-ui/react";

import styles from "./Sidebar.module.css";
import Subtitle from "../common/Subtitle";
import SidebarCollapseGroup from "./SidebarCollapseGroup";

const SidebarLayout: React.FC = () => {
  return (
    <aside className={styles.SidebarLayoutContainer}>
      <div className={styles.SidebarLayout}>
        <Grid.Container
          className={styles.SidebarLayoutTop}
          gap={2}
          direction="column"
          style={{ minHeight: "200px" }}
        >
          <Grid
            className={styles.SubtitleContainer}
            direction="row"
            justify="center"
          >
            <Subtitle />
          </Grid>
          <Grid className={styles.SidebarCollapseGroupContainer} xs>
            <SidebarCollapseGroup />
          </Grid>
        </Grid.Container>
      </div>
    </aside>
  );
};

export default SidebarLayout;
