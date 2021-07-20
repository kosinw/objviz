import * as React from "react";

import { Card, Slider, Text } from "@geist-ui/react";

import styled from "styled-components";

const FixedPositionContainer = styled.div`
  position: absolute;
  left: calc(50% - 20rem);
  bottom: 3%;
  opacity: 0%;
  width: 40rem;
  transition: opacity 0.3s cubic-bezier(0.12, 0, 0.39, 0);

  :hover {
    opacity: 100%;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export type ViewerLimitSliderProps = {
  limit: number;
  setLimit: React.Dispatch<number>;
};

const ViewerLimitSlider: React.FC<ViewerLimitSliderProps> = ({
  limit,
  setLimit,
}) => {
  return (
    <FixedPositionContainer>
      <Card>
        <SliderContainer>
          <Text small b>
            Object Limit
          </Text>
          <Slider
            style={{ width: "75%" }}
            step={5}
            min={5}
            value={limit}
            onChange={setLimit}
            initialValue={10}
            max={100}
            showMarkers
          />
        </SliderContainer>
      </Card>
    </FixedPositionContainer>
  );
};

export default ViewerLimitSlider;
