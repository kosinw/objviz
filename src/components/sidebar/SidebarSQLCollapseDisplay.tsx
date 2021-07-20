import * as React from "react";
import {
  Card,
  Button,
  Code,
  useClipboard,
  useToasts,
  Text,
} from "@geist-ui/react";

import styled from "styled-components";

export interface SidebarSQLCollapseDisplayProps {
  queryCode: string;
}

const StyledCode = styled(Code)`
  box-sizing: border-box;
  overflow: auto auto;
  max-height: 300px;
  border: 0;
  width: 100%;
  height: 100%;
  margin: -16pt -16pt 0 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;

  scrollbar-width: none;
`;

const SidebarSQLCollapseDisplay: React.FC<SidebarSQLCollapseDisplayProps> = ({
  queryCode,
}) => {
  const { copy } = useClipboard();
  const [, setToast] = useToasts();

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (_e) => {
    copy(queryCode);
    setToast({ text: "Copied SQL query succcesfully." });
  };

  return !!queryCode ? (
    <Card>
      <StyledCode block>{queryCode}</StyledCode>
      <Card.Footer style={{ padding: 0, boxSizing: "border-box" }}>
        <Button
          onClick={onClick}
          style={{
            margin: 0,
            border: 0,
            padding: 0,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          auto
        >
          Copy to Clipboard
        </Button>
      </Card.Footer>
    </Card>
  ) : (
    <Text small type="secondary">
      Enter a query to view generated SQL.
    </Text>
  );
};

export default SidebarSQLCollapseDisplay;
