import * as React from "react";

import styles from "./Viewer.module.css";

// import ViewerInactiveCover from "./ViewerInactiveCover";
import ViewerCanvasComponent from "./ViewerCanvasComponent";

const ViewerLayout: React.FC = () => {
  return (
    <div className={styles.ViewerLayout}>
      {/* <ViewerInactiveCover
        title="Not Connected"
        subtitle="Connect to Postgres database to begin visualizing object dependencies."
      /> */}
      <ViewerCanvasComponent
        data={{
          nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
          links: [
            { source: "Harry", target: "Sally" },
            { source: "Harry", target: "Alice" },
          ],
        }}
      />
    </div>
  );
};

export default ViewerLayout;
