import * as React from "react";
import { Grid, Text, Dot } from "@geist-ui/react";
import { QuestionCircle, Settings } from "@geist-ui/react-icons";

const TopbarRightGroup: React.FC = () => {
  return (
    <Grid.Container gap={2} direction="row">
      <Grid
        style={{ display: "flex", userSelect: "none" }}
        alignItems="center"
        md
        xs={0}
      >
        <Dot>
          <Text type="secondary" small>
            Disconnected
          </Text>
        </Dot>
      </Grid>
      <Grid style={{ display: "flex" }} alignItems="center" md xs={0}>
        <Settings size={20} />
      </Grid>
      <Grid style={{ display: "flex" }} alignItems="center" md xs={0}>
        <QuestionCircle size={20} />
      </Grid>
    </Grid.Container>
  );
};

export default TopbarRightGroup;
