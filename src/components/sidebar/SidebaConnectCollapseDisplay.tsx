import * as React from "react";

import { Grid, Button, Select, Text } from "@geist-ui/react";
import { Plus } from "@geist-ui/react-icons";

import styled from "styled-components";

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SidebarConnectCollapseDisplay: React.FC = () => {
  return (
    <form>
      <Grid.Container gap={2} direction="column">
        <Grid xs justify="center">
          <FieldContainer>
            <Text
              small
              type="secondary"
              style={{
                display: "inline-flex",
                margin: 0,
                marginBottom: "10px",
              }}
            >
              Preset
            </Text>
            <Select placeholder="Choose one" />
          </FieldContainer>
        </Grid>
        <Grid xs justify="flex-end">
          <Button icon={<Plus />} style={{ marginTop: 5 }}>
            Add Preset
          </Button>
        </Grid>
      </Grid.Container>
    </form>
  );
};

export default SidebarConnectCollapseDisplay;
