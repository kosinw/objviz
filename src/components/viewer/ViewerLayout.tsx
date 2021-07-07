import * as React from "react";
import { useTheme } from "@geist-ui/react";

import styles from "./Viewer.module.css";

import ViewerInactiveCover from "./ViewerInactiveCover";
import { useQuery } from "react-query";
import { useURIStore } from "../../data/uri.store";
import { verifyURI } from "../../api/uri.api";
// import ViewerCanvasComponent from "./ViewerCanvasComponent";

const ViewerLayout: React.FC = () => {
  const theme = useTheme();

  const [databaseURI] = useURIStore((state) => [state.currentRecord]);
  const { isLoading, data } = useQuery(
    ["verifyURI", { uri: databaseURI }],
    () => verifyURI(databaseURI)
  );

  return (
    <div
      className={`${styles.ViewerLayout} ${
        theme.type === "light" ? styles.ViewerLayoutLight : ""
      }`}
    >
      {isLoading || !data ? (
        <ViewerInactiveCover
          title="Not Connected"
          subtitle="Connect to Postgres database to begin visualizing object dependencies."
        />
      ) : (
        <ViewerInactiveCover
          title="Connected"
          subtitle="Enter object information under Query to visualize that object."
        />
      )}
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
