import * as React from "react";

import styled from "styled-components";

import { Loading, Row, Code, Text, useTheme } from "@geist-ui/react";
import JSONTree from "react-json-tree";

import Visible from "../common/Visible";

import { useSelectedStore } from "../../data/selection";
import { useObjectInfo } from "../../hooks/objectInfo";

const Container = styled.div`
  height: 100%;
`;

const StyledCode = styled(Code)`
  margin: 0;
  max-height: fit-content;
  scrollbar-width: none;
`;

const SidebarInspectCollapseTable: React.FC = () => {
  const [selectedNode] = useSelectedStore((state) => [state.selected]);
  const { data, isLoading } = useObjectInfo();

  const { palette } = useTheme();

  const viewerTheme = {
    scheme: "vercel",
    base00: palette.background,
    base01: "#383830",
    base02: "#49483e",
    base03: "#75715e",
    base04: "#a59f85",
    base05: "#f8f8f2",
    base06: "#f5f4f1",
    base07: "#f9f8f5",
    base08: "#f92672",
    base09: palette.warning,
    base0A: "#f4bf75",
    base0B: palette.purple,
    base0C: "#a1efe4",
    base0D: palette.code,
    base0E: "#ae81ff",
    base0F: palette.warning,
  };

  return (
    <Container>
      {!selectedNode && (
        <Text small type="secondary">
          No object currently selected.
        </Text>
      )}
      <Visible visible={!!selectedNode}>
        {isLoading ? (
          <Row style={{ padding: "10px 0 0 0" }}>
            <Loading>Loading</Loading>
          </Row>
        ) : (
          <StyledCode block>
            <JSONTree theme={viewerTheme} invertTheme={false} data={data} />
          </StyledCode>
        )}
      </Visible>
    </Container>
  );
};

export default SidebarInspectCollapseTable;
