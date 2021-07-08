import * as React from "react";
import { Text, Dot } from "@geist-ui/react";

import styled from "styled-components";

import { useVerifyURI } from "../../hooks/verifyURI";
import { useDisconnect } from "../../hooks/disconnect";

const HoverableDot = styled(Dot)`
  :hover {
    cursor: pointer;
  }
`;

const TopbarStatusIndicator: React.FC = () => {
  const { disconnect } = useDisconnect();
  const { data, isLoading } = useVerifyURI();

  const [text, textColor, dotColor]: [
    string,
    "default" | "secondary",
    "success" | "default"
  ] = React.useMemo(
    () =>
      !!data
        ? ["Connected", "default", "success"]
        : ["Disconnected", "secondary", "default"],
    [data]
  );

  if (isLoading) {
    return (
      <Dot>
        <Text type="secondary" small>
          Loading
        </Text>
      </Dot>
    );
  }

  const DotComponent = data ? HoverableDot : Dot;

  return (
    <DotComponent onClick={() => data && disconnect()} type={dotColor}>
      <Text type={textColor} small>
        {text}
      </Text>
    </DotComponent>
  );
};

export default TopbarStatusIndicator;
