import * as React from "react";
import { Collapse, Text } from "@geist-ui/react";

import styled from "styled-components";

import SidebarQueryCollapseForm from "./SidebarQueryCollapseForm";
import SidebarSQLCollapseDisplay from "./SidebarSQLCollapseDisplay";
import SidebarInspectCollapseTable from "./SidebarInspectCollapseTable";
import SidebarConnectCollapseForm from "./SidebarConnectCollapseForm";
import SidebarStatsCollapseView from "./SidebarStatsCollapseView";

import { useClientStore } from "../../data/client";
import { useURIStore } from "../../data/uri";

const SidebarCollapseGroupContainer = styled(Collapse.Group)`
  width: 100% !important;
`;

const SidebarConnectCollapseContainer: React.FC = () => {
  const uri = useURIStore((state) => state.uri);

  return (
    <Collapse
      title="Connect"
      initialVisible={!uri}
      subtitle={<Text small>View your saved database connections.</Text>}
    >
      <SidebarConnectCollapseForm />
    </Collapse>
  );
};

const SidebarQueryCollapseContainer: React.FC = () => {
  const uri = useURIStore((state) => state.uri);

  return (
    <Collapse
      title="Query"
      initialVisible={!!uri}
      subtitle={
        <Text small>
          Enter an initial object to begin dependency graph visualization.
        </Text>
      }
    >
      <SidebarQueryCollapseForm />
    </Collapse>
  );
};

const SidebarInspectCollapseContainer: React.FC = () => {
  return (
    <Collapse
      title="Inspect"
      subtitle={<Text small>Click on any object for more information.</Text>}
    >
      <SidebarInspectCollapseTable />
    </Collapse>
  );
};

const SidebarStatsCollapseContainer: React.FC = () => {
  return (
    <Collapse
      title="Statistics"
      subtitle={<Text small>View statistics about dependency graph.</Text>}
    >
      <Text type="secondary" small>
        <SidebarStatsCollapseView />
      </Text>
    </Collapse>
  );
};

// TODO(kosi): Add content to SQL container
const SidebarSQLCollapseContainer: React.FC = () => {
  const [sqlStatements] = useClientStore((store) => [store.sqlStatements]);

  return (
    <Collapse
      title="Generated SQL"
      subtitle={<Text small>View executed SQL queries.</Text>}
    >
      <SidebarSQLCollapseDisplay queryCode={sqlStatements} />
    </Collapse>
  );
};

const SidebarCollapseGroup: React.FC = () => {
  return (
    <SidebarCollapseGroupContainer>
      <SidebarConnectCollapseContainer />
      <SidebarQueryCollapseContainer />
      <SidebarInspectCollapseContainer />
      <SidebarStatsCollapseContainer />
      <SidebarSQLCollapseContainer />
    </SidebarCollapseGroupContainer>
  );
};

export default SidebarCollapseGroup;
