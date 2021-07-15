import * as React from "react";
import { useTheme } from "@geist-ui/react";

import styles from "./Viewer.module.css";

import ViewerInactiveCover from "./ViewerInactiveCover";
import ViewerCanvasComponent, {
  ViewerGraphFormat,
  ViewerGraphNode,
} from "./ViewerCanvasComponent";
import ViewerControlsCard from "./ViewerControlsCard";

import { GraphLink } from "react-d3-graph";

import { useVerifyURI } from "../../hooks/verifyURI";
import { useNetworkData } from "../../hooks/networkData";
import { GetNetworkResponse } from "../../api/network";

const truncate = (target: string, length: number) => {
  return target.substring(0, length) + (length < target.length ? "..." : "");
};

// TODO(kosi): Move this logic inside ViewerCanvasComponent as layout should not deal with
// logic like this.
const mapNetworkInfoToViewerFormat = (
  network: GetNetworkResponse | undefined | null
): ViewerGraphFormat => {
  const nodes: ViewerGraphNode[] = [];
  const links: GraphLink[] = [];

  if (!network) {
    return { nodes, links };
  }

  for (const key in network) {
    nodes.push({
      id: key,
      type: network[key].type,
      dbid: network[key].id,
      name: truncate(!!network[key].name ? network[key].name : "[no name]", 15),
      color: key === "1" ? "#7928CA" : "#fff",
      fontColor: key === "1" ? "#7928CA" : "#fff",
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
  const { isLoading: networkLoading } = useNetworkData();
  const {
    isAvailable,
    isLoading: isNetworkLoading,
    data: networkInfo,
  } = useNetworkData();

  const finalData = React.useMemo(
    () => mapNetworkInfoToViewerFormat(networkInfo),
    [networkInfo]
  );

  if (!isAvailable || isNetworkLoading || !networkInfo) {
    return (
      <div
        className={`${styles.ViewerLayout} ${
          theme.type === "light" ? styles.ViewerLayoutLight : ""
        }`}
      >
        {networkLoading ? (
          <ViewerInactiveCover
            title="Loading"
            subtitle="Thank you for your patience as we fetch your query."
          />
        ) : isLoading ? (
          <ViewerInactiveCover
            title="Loading"
            subtitle="Thank you for your patience as we verify your connection."
          />
        ) : !data ? (
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
      </div>
    );
  }

  return (
    <div
      className={`${styles.ViewerLayout} ${
        theme.type === "light" ? styles.ViewerLayoutLight : ""
      }`}
    >
      <ViewerCanvasComponent data={finalData} />
      <ViewerControlsCard />
    </div>
  );
};

export default ViewerLayout;
