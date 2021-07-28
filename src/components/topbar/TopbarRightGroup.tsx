import * as React from "react";
import { Grid, Button } from "@geist-ui/react";
import { Moon, Sun } from "@geist-ui/react-icons";

import TopbarStatusIndicator from "./TopbarStatusIndicator";
import { useThemeStore } from "../../data/theme";

const TopbarRightThemeButton: React.FC = () => {
  const [value, setValue] = useThemeStore((store) => [store.theme, store.set]);

  return (
    <Button
      onClick={() => setValue(value === "dark" ? "light" : "dark")}
      icon={value === "dark" ? <Moon /> : <Sun />}
      size="mini"
    >
      {value === "dark" ? "Dark" : "Light"}
    </Button>
  );
};

const TopbarRightGroup: React.FC = () => {
  return (
    <Grid.Container gap={2} direction="row">
      <Grid
        style={{ display: "flex", userSelect: "none" }}
        alignItems="center"
        xs
      >
          <TopbarStatusIndicator />
      </Grid>
      <Grid style={{ display: "flex" }} alignItems="center" xs>
        <TopbarRightThemeButton />
      </Grid>
    </Grid.Container>
  );
};

export default TopbarRightGroup;
