import * as React from "react";
import { Grid } from "@geist-ui/react";
import { QuestionCircle, Settings } from "@geist-ui/react-icons";

import TopbarStatusIndicator from "./TopbarStatusIndicator";

const TopbarRightGroup: React.FC = () => {
  return (
    <Grid.Container gap={2} direction="row">
      <Grid
        style={{ display: "flex", userSelect: "none" }}
        alignItems="center"
        md
        xs={0}
      >
        <TopbarStatusIndicator />
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
