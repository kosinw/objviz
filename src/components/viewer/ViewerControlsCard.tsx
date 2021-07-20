import * as React from "react";

import { Card, Text, Keyboard, Row } from "@geist-ui/react";
import Visible from "../common/Visible";

import styled from "styled-components";
import { useKey } from "react-use";

const StyledVisible = styled(Visible)`
  z-index: 99;
  position: fixed;
  bottom: 1.6rem;
  right: 1rem;
  width: auto !important;
  min-width: 237px;
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

const ViewerControlsCard: React.FC = () => {
  const [isVisible, setVisible] = React.useState<boolean>(true);

  const handleKeyPress = React.useCallback(
    (e: KeyboardEvent) => {
      const { repeat } = e;
      if (repeat) {
        return;
      }
      setVisible((prev) => !prev);
    },
    [setVisible]
  );

  useKey("t", handleKeyPress);

  return (
    <StyledVisible visible={isVisible}>
      <Card hoverable>
        <StyledRow>
          <Keyboard>R</Keyboard>
          <RightText small>Reset viewport</RightText>
        </StyledRow>
        <StyledRow>
          <Keyboard>Q</Keyboard>
          <RightText small>Rerun last query</RightText>
        </StyledRow>
        <StyledRow>
          <Keyboard>T</Keyboard>
          <RightText small>Toggle this menu</RightText>
        </StyledRow>
        <StyledRow>
          <Keyboard>C</Keyboard>
          <RightText small>Clear current query</RightText>
        </StyledRow>
      </Card>
    </StyledVisible>
  );
};

export default ViewerControlsCard;
