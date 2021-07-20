import * as React from "react";
import { Grid } from "@geist-ui/react";
// import { QuestionCircle, Settings, MoreVertical } from "@geist-ui/react-icons";

import TopbarStatusIndicator from "./TopbarStatusIndicator";

// import styled from "styled-components";

// const QuestionCircleButton = styled(QuestionCircle)`
//   :hover {
//     cursor: pointer;
//   }
// `;

// const MoreVerticalButton = styled(MoreVertical)`
//   :hover {
//     cursor: pointer;
//   }
// `;

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
      {/* <Grid style={{ display: "flex" }} alignItems="center" md xs={0}>
        <Settings size={20} />
      </Grid>
      <Grid style={{ display: "flex" }} alignItems="center" md xs={0}>
        <QuestionCircleButton size={20} />
      </Grid>
      <Grid style={{ display: "flex" }} alignItems="center" md xs={0}>
        <MoreVerticalButton size={20} />
      </Grid> */}
    </Grid.Container>
  );
};

export default TopbarRightGroup;
