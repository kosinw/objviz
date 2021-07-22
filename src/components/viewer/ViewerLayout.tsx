import * as React from "react";
import { GeistUIThemes, useTheme } from "@geist-ui/react";

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
import ViewerLimitSlider from "./ViewerLimitSlider";
import { useClientStore } from "../../data/client";

const truncate = (target: string, length: number) => {
  return target.substring(0, length) + (length < target.length ? "..." : "");
};

// TODO(kosi): Move this logic inside ViewerCanvasComponent as layout should not deal with
// logic like this.
const mapNetworkInfoToViewerFormat = (
  response: GetNetworkResponse | undefined | null,
  limit: number = 100,
  theme: GeistUIThemes
): ViewerGraphFormat => {
  const nodes: ViewerGraphNode[] = [];
  const links: GraphLink[] = [];

  if (!response) {
    return { nodes, links };
  }

  const { network } = response;

  for (const key in network) {
    if (parseInt(key) > limit) {
      continue;
    }

    const deadNode = !network[key].name;

    nodes.push({
      id: key,
      type: network[key].type,
      dbid: network[key].id,
      name: truncate(!deadNode ? network[key].name : "nil", 15),
      color: deadNode
        ? theme.palette.accents_4
        : key === "0"
        ? "#7928CA"
        : theme.palette.foreground,
      fontColor: deadNode
        ? theme.palette.accents_4
        : key === "0"
        ? "#7928CA"
        : theme.palette.foreground,
    });

    for (let i = 0; i < network[key].pointers_from.length; ++i) {
      const n = network[key].pointers_from[i];

      if (!!n) {
        if (n > limit) {
          continue;
        }

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
  const [setClientState] = useClientStore((store) => [store.set]);
  const [limit, setLimit] = React.useState<number>(10);

  React.useEffect(() => {
    setClientState((draft) => {
      draft.sqlStatements =
        !!networkInfo && !!networkInfo.sqlQueries
          ? Object.keys(networkInfo?.sqlQueries).join("\n")
          : "";
    });
  }, [networkInfo, setClientState]);

  const finalData = React.useMemo(
    () => mapNetworkInfoToViewerFormat(networkInfo, limit, theme),
    [networkInfo, limit, theme]
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
      <ViewerLimitSlider limit={limit} setLimit={setLimit} />
    </div>
  );
};

export default ViewerLayout;
