import * as React from "react";
import { Card, Button, Code, useClipboard, useToasts } from "@geist-ui/react";

export interface SidebarSQLCollapseDisplayProps {
  queryCode: string;
}

const SidebarSQLCollapseDisplay: React.FC<SidebarSQLCollapseDisplayProps> = ({
  queryCode,
}) => {
  const { copy } = useClipboard();
  const [, setToast] = useToasts();

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (_e) => {
    copy(queryCode);
    setToast({ text: "Copied SQL query succcesfully." });
  };

  return (
    <Card>
      <Code
        style={{
          boxSizing: "border-box",
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "300px",
          border: 0,
          width: "100%",
          height: "100%",
          margin: "-16pt -16pt 0 0",
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }}
        block
      >
        {queryCode}
      </Code>
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
  );
};

export default SidebarSQLCollapseDisplay;
