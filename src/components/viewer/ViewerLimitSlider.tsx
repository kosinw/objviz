import * as React from "react";

import { Card, Slider, Text } from "@geist-ui/react";

import styled from "styled-components";

const FixedPositionContainer = styled.div`
  position: absolute;
  left: calc(50% - 21rem);
  bottom: 8%;
  /* opacity: 0%; */
  width: 42rem;
  transition: opacity 0.3s cubic-bezier(0.12, 0, 0.39, 0);

  :hover {
    /* opacity: 100%; */
    z-index: 999;
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
  max?: number;
};

const ViewerLimitSlider: React.FC<ViewerLimitSliderProps> = ({
  limit,
  setLimit,
  max = 100,
}) => {
  return (
    <FixedPositionContainer>
      <Card>
        <SliderContainer>
          <Text small b>
            Object Limit
          </Text>
          <Slider
            style={{ width: "75%", marginRight: 10, zIndex: 1 }}
            step={5}
            min={5}
            value={limit}
            onChange={setLimit}
            initialValue={10}
            max={Math.max(max, 100)}
            showMarkers
          />
        </SliderContainer>
      </Card>
    </FixedPositionContainer>
  );
};

export default ViewerLimitSlider;
