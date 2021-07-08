import * as React from "react";
import { useTheme } from "@geist-ui/react";

import styles from "./Viewer.module.css";

import ViewerInactiveCover from "./ViewerInactiveCover";
import ViewerCanvasComponent, {
  ViewerGraphFormat,
  ViewerGraphNode,
} from "./ViewerCanvasComponent";
import { GraphLink } from "react-d3-graph";

import { useVerifyURI } from "../../hooks/verifyURI";
import { useNetworkData } from "../../hooks/networkData";
import { GetNetworkResponse } from "../../api/network";

const mapNetworkInfoToViewerFormat = (
  network: GetNetworkResponse
): ViewerGraphFormat => {
  const nodes: ViewerGraphNode[] = [];
  const links: GraphLink[] = [];

  for (const key in network) {
    nodes.push({
      id: key,
      type: network[key].type,
      label: `${network[key].type} (${network[key].id})`,
    });

    for (let i = 0; i < network[key].pointers_from.length; ++i) {
      const n = network[key].pointers_from[i];
      if (!!n) {
        links.push({ target: key, source: n.toString() });
      }
    }
  }

  return { nodes, links };
};

const ViewerLayout: React.FC = () => {
  const theme = useTheme();
  const { isLoading, data } = useVerifyURI();
  const {
    isAvailable,
    isLoading: isNetworkLoading,
    data: networkInfo,
  } = useNetworkData();

  if (!isAvailable || isNetworkLoading || !networkInfo) {
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
  }

  return (
    <div
      className={`${styles.ViewerLayout} ${
        theme.type === "light" ? styles.ViewerLayoutLight : ""
      }`}
    >
      <ViewerCanvasComponent data={mapNetworkInfoToViewerFormat(networkInfo)} />
    </div>
  );
};

export default ViewerLayout;
