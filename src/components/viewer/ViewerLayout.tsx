import * as React from "react";
import { useTheme } from "@geist-ui/react";

import styled from "styled-components";

import ViewerInactiveCover from "./ViewerInactiveCover";
import ViewerCanvasComponent from "./ViewerCanvasComponent";
import ViewerControlsCard from "./ViewerControlsCard";
import ViewerLimitSlider from "./ViewerLimitSlider";

import { useVerifyURI } from "../../hooks/verifyURI";
import { useNetworkData } from "../../hooks/networkData";
import { useClientStore } from "../../data/client";

const ViewerLayoutContainer = styled.div<{ light: boolean }>`
  background-image: ${(props) =>
    props.light
      ? `radial-gradient(#e3e3e3 1px, transparent 0),
    radial-gradient(#e3e3e3 1px, transparent 0)`
      : `radial-gradient(rgb(51, 51, 51) 1px, transparent 0px),
    radial-gradient(rgb(34, 34, 34) 1px, transparent 0px)`};
  background-position: 0px 0px, 25px 25px;
  background-attachment: fixed;
  background-size: 50px 50px;
  width: 100%;
  max-height: 100%;
  height: 100%;
  overflow: hidden;
`;

const ViewerLayout: React.FC = () => {
  const theme = useTheme();
  const { isLoading, data } = useVerifyURI();
  const { isLoading: isNetworkLoading, data: networkInfo } = useNetworkData();
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

  if (!networkInfo) {
    return (
      <ViewerLayoutContainer light={theme.type === "light"}>
        {isNetworkLoading ? (
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
      </ViewerLayoutContainer>
    );
  }

  return (
    <ViewerLayoutContainer light={theme.type === "light"}>
      <ViewerCanvasComponent networkInfo={networkInfo} limit={limit} />
      <ViewerControlsCard />
      <ViewerLimitSlider limit={limit} setLimit={setLimit} />
    </ViewerLayoutContainer>
  );
};

export default ViewerLayout;
