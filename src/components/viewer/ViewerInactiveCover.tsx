import * as React from "react";
import { Text, Spinner } from "@geist-ui/react";

import styled from "styled-components";

export interface ViewerInactiveCoverProps {
  title: string;
  subtitle: string;
  spinner?: boolean;
}

const ViewerInactiveCoverContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const ViewerInactiveCover: React.FC<ViewerInactiveCoverProps> = ({
  title,
  subtitle,
  spinner = false,
}) => {
  return (
    <ViewerInactiveCoverContainer>
      <Text h1>{title} {!!spinner && <Spinner size="large" style={{ display: "inline-flex" }} />}</Text>
      <Text style={{ margin: 0 }} type="secondary" p>
        {subtitle}
      </Text>
    </ViewerInactiveCoverContainer>
  );
};

export default ViewerInactiveCover;
