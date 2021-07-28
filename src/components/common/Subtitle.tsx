import * as React from "react";
import { Text } from "@geist-ui/react";

import styled from "styled-components";

export interface SubtitleProps {
  value?: string;
}

const SubtitleContainer = styled(Text)`
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  margin: 9pt 0;
  display: block;
`;

const Subtitle: React.FC<SubtitleProps> = ({
  value = "Database Object Visualizer",
}) => {
  return (
    <SubtitleContainer span type="secondary">
      {value}
    </SubtitleContainer>
  );
};

export default Subtitle;
