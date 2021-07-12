import * as React from "react";

import styled from "styled-components";

import { Table, Code } from "@geist-ui/react";
import { useSelectedStore } from "../../data/selection";

import Visible from "../common/Visible";

const Container = styled.div`
  overflow: hidden auto;
  height: 100%;
  max-height: 450px;

  ::-webkit-scrollbar {
    width: 0px;
    background-color: transparent;
  }
`;

const SidebarInspectCollapseTable: React.FC = () => {
  const [selectedNode] = useSelectedStore((state) => [state.selected]);

  const data = [
    {
      property: <Code>orange soda</Code>,
      value: <Code>baby keem</Code>,
      type: <Code>{typeof("baby keeeeeeem")}</Code>
    },
  ];

  return (
    <Container>
      <Visible visible={!!selectedNode}>
        <Table data={data}>
          <Table.Column prop="property" label="property" />
          <Table.Column prop="value" label="value" />
          <Table.Column prop="type" label="type" />
        </Table>
      </Visible>
    </Container>
  );
};

export default SidebarInspectCollapseTable;
