import * as React from "react";
import { Collapse, Text } from "@geist-ui/react";

import styles from "./Sidebar.module.css";

import SidebarQueryCollapseForm from "./SidebarQueryCollapseForm";
import SidebarSQLCollapseDisplay from "./SidebarSQLCollapseDisplay";
import SidebarInspectCollapseTable from "./SidebarInspectCollapseTable";
import SidebarConnectCollapseDisplay from "./SidebaConnectCollapseDisplay";

import { useClientStore } from "../../data/client";

const SidebarConnectCollapseContainer: React.FC = () => {
  return (
    <Collapse
      title="Connect"
      subtitle={<Text small>View your saved preset database connections.</Text>}
    >
      <SidebarConnectCollapseDisplay />
    </Collapse>
  );
};

const SidebarQueryCollapseContainer: React.FC = () => {
  return (
    <Collapse
      title="Query"
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
      className={styles.SidebarInspectCollapseContainer}
      title="Inspect"
      subtitle={<Text small>Click on any object for more information.</Text>}
    >
      <SidebarInspectCollapseTable />
    </Collapse>
  );
};

// TODO(kosi): Add content to stats container
const SidebarStatsCollapseContainer: React.FC = () => {
  return (
    <Collapse
      title="Statistics"
      subtitle={<Text small>View statistics about dependency graph.</Text>}
    >
      <Text type="secondary" small>
        To be implemented.
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
    <Collapse.Group className={styles.SidebarCollapseGroup}>
      <SidebarConnectCollapseContainer />
      <SidebarQueryCollapseContainer />
      <SidebarInspectCollapseContainer />
      <SidebarStatsCollapseContainer />
      <SidebarSQLCollapseContainer />
    </Collapse.Group>
  );
};

export default SidebarCollapseGroup;
