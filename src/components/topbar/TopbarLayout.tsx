import * as React from "react";
import { useMeasure } from "react-use";
import { useTheme } from "@geist-ui/react";
import { useClientStore } from "../../data/client";

import styled from "styled-components";

import TopbarDatabaseURIForm from "./TopbarDatabaseURIForm";
import TopbarRightGroup from "./TopbarRightGroup";

const TopbarLayoutContainer = styled.header<{ light: boolean }>`
  padding: 16pt;
  display: flex;
  border-bottom: thin solid;
  width: 100%;
  box-sizing: border-box;
  border-bottom-color: ${(props) => (props.light ? "#eaeaea" : "#333")};
`;

const TopbarLayoutContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const TopbarLayoutURIFormContainer = styled.div`
  flex: 1 1 auto;
  width: 100%;
`;

const TopbarLayoutRightGroupContainer = styled.div`
  flex: none;
  margin-left: 16pt;
`;

const TopbarLayout: React.FC = () => {
  const [ref, { height }] = useMeasure<HTMLElement>();
  const [set] = useClientStore((store) => [store.set]);
  const theme = useTheme();

  React.useLayoutEffect(() => {
    set((draft) => {
      draft.topbarHeight = height;
    });
  }, [height, set, ref]);

  return (
    <TopbarLayoutContainer light={theme.type === "light"} ref={ref}>
      <TopbarLayoutContentContainer>
        <TopbarLayoutURIFormContainer>
          <TopbarDatabaseURIForm />
        </TopbarLayoutURIFormContainer>
        <TopbarLayoutRightGroupContainer>
          <TopbarRightGroup />
        </TopbarLayoutRightGroupContainer>
      </TopbarLayoutContentContainer>
    </TopbarLayoutContainer>
  );
};

export default TopbarLayout;
