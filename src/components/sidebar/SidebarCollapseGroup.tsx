import * as React from "react";
import { Collapse, Text } from "@geist-ui/react";

import styles from "./Sidebar.module.css";
import SidebarQueryCollapseForm from "./SidebarQueryCollapseForm";
import SidebarSQLCollapseDisplay from "./SidebarSQLCollapseDisplay";

const SidebarQueryCollapseContainer: React.FC = () => {
  return (
    <Collapse
      initialVisible={true}
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

// TODO(kosi): Add content to stats container
const SidebarStatsCollapseContainer: React.FC = () => {
  return (
    <Collapse
      title="Statistics"
      subtitle={<Text small>View statistics about dependency graph.</Text>}
    ></Collapse>
  );
};

// TODO(kosi): Add content to SQL container
const SidebarSQLCollapseContainer: React.FC = () => {
  return (
    <Collapse
      title="Generated SQL"
      subtitle={<Text small>View executed SQL queries.</Text>}
    >
      <SidebarSQLCollapseDisplay
        queryCode={`SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
SELECT * FROM person
`}
      />
    </Collapse>
  );
};

const SidebarCollapseGroup: React.FC = () => {
  return (
    <Collapse.Group className={styles.SidebarCollapseGroup}>
      <SidebarQueryCollapseContainer />
      <SidebarStatsCollapseContainer />
      <SidebarSQLCollapseContainer />
    </Collapse.Group>
  );
};

export default SidebarCollapseGroup;
