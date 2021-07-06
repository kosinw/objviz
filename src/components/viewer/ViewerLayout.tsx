import * as React from "react";

import styles from "./Viewer.module.css";

import ViewerInactiveCover from "./ViewerInactiveCover";
import ViewerCanvasComponent from "./ViewerCanvasComponent";

const ViewerLayout: React.FC = () => {
  return (
    <div className={styles.ViewerLayout}>
      <ViewerInactiveCover
        title="Not Connected"
        subtitle="Connect to Postgres database to begin visualizing object dependencies."
      />
      {/* <ViewerCanvasComponent
        data={{
          nodes: [
            { id: "1500003", type: "adunit", label: "adunit (1500003)" },
            { id: "189888", type: "account", label: "account (189888)" },
            { id: "178725", type: "network", label: "network (178725)" },
          ],
          links: [
            { source: "1500003", target: "189888" },
            { source: "178725", target: "189888" },
          ],
        }}
      /> */}
    </div>
  );
};

export default ViewerLayout;
