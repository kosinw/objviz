import * as React from "react";

import { Card, Text, Keyboard, Row, Button } from "@geist-ui/react";
import { Play, Square } from "@geist-ui/react-icons";
import Visible from "../common/Visible";

import styled from "styled-components";
import { useKey } from "react-use";

const StyledVisible = styled(Visible)`
  z-index: 99;
  position: fixed;
  bottom: 1.6rem;
  right: 1rem;
  width: auto !important;
  min-width: 300px;
`;

const StyledRow = styled(Row)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.6rem 0;
`;

const RightText = styled(Text)`
  flex: 1 1 auto;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export type ViewerControlsCardProps = {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

const ViewerControlsCard: React.FC<ViewerControlsCardProps> = ({
  playing,
  setPlaying,
}) => {
  const [isVisible, setVisible] = React.useState<boolean>(true);
  // const cancelPlay = React.useRef<NodeJS.Timeout>();

  const handleKeyPress = React.useCallback(
    (e: KeyboardEvent) => {
      if (!e.ctrlKey || !e.altKey) {
        return;
      }

      const { repeat } = e;
      if (repeat) {
        return;
      }

      setVisible((prev) => !prev);
    },
    [setVisible]
  );

  useKey("t", handleKeyPress);

  const handlePlayAnimation = () => {
    if (playing === false) {
      setPlaying(true);

      // NOTE(kosi): Make this configurable somewhere, rn just hard coded at 5 seconds
      // cancelPlay.current = setTimeout(() => {
      //   setPlaying(false);
      // }, 5000);
    } else {
      setPlaying(false);
      // if (!!cancelPlay.current) {
      //   setPlaying(false);
      //   clearTimeout(cancelPlay.current);
      // }
    }
  };

  return (
    <StyledVisible visible={isVisible}>
      <Card shadow hoverable>
        <StyledRow style={{ marginBottom: 20 }}>
          <Button
            icon={playing ? <Square /> : <Play />}
            onClick={() => handlePlayAnimation()}
            style={{ width: "100%" }}
            size="mini"
            type="secondary-light"
          >
            {playing ? "Stop" : "Play"} animation
          </Button>
        </StyledRow>
        <StyledRow>
          <Keyboard ctrl option>
            Q
          </Keyboard>
          <RightText small>Rerun last query</RightText>
        </StyledRow>
        <StyledRow>
          <Keyboard ctrl option>
            T
          </Keyboard>
          <RightText small>Toggle this menu</RightText>
        </StyledRow>
        <StyledRow>
          <Keyboard ctrl option>
            C
          </Keyboard>
          <RightText small>Clear current query</RightText>
        </StyledRow>
        <StyledRow>
          <Keyboard ctrl option>
            D
          </Keyboard>
          <RightText small>Deselect selected node</RightText>
        </StyledRow>
      </Card>
    </StyledVisible>
  );
};

export default ViewerControlsCard;
