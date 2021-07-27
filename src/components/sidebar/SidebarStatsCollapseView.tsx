import * as React from "react";
import { Tree, Row, Loading, Text } from "@geist-ui/react";
import { useNetworkData } from "../../hooks/networkData";

const SidebarStatsCollapseView: React.FC = () => {
  const { isLoading, data } = useNetworkData();

  const constructStatsTree = (statistics: {
    [x: string]: any;
  }): JSX.Element[] => {
    return Object.entries(statistics).map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return (
          <Tree.Folder key={key} name={key}>
            {constructStatsTree(value)}
          </Tree.Folder>
        );
      } else {
        return (
          <Tree.File
            key={key}
            name={key.replaceAll("_", " ")}
            extra={"" + value}
          />
        );
      }
    });
  };

  return isLoading ? (
    <Row style={{ padding: "10px 0 0 0" }}>
      <Loading>Loading</Loading>
    </Row>
  ) : !data ? (
    <Text small type="secondary">
      Enter a query to view statistics.
    </Text>
  ) : (
    <Tree>
      <Tree.Folder name="root">
        {constructStatsTree(data.statistics)}
      </Tree.Folder>
    </Tree>
  );
};

export default SidebarStatsCollapseView;
