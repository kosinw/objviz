import * as React from "react";
import { Grid } from "@geist-ui/react";

import Subtitle from "../common/Subtitle";
import SidebarCollapseGroup from "./SidebarCollapseGroup";

import { useMeasure } from "react-use";
import { useClientStore } from "../../data/client";
import styled from "styled-components";

const SidebarLayoutContainer = styled.aside`
  padding: 16pt;
  height: 100%;
  display: block;
  box-sizing: border-box;
  overflow-x: hidden;
  position: relative;
  overflow-y: hidden;
`;

const SidebarLayoutInnerContainer = styled.div`
  flex-direction: column;
  display: flex;
  height: 100%;
  max-width: 550px;
  margin: 0 auto;
`;

const SubtitleContainer = styled(Grid)`
  text-align: center;
`;

const SidebarCollapseGroupContainer = styled(Grid)`
  overflow: hidden auto;
  height: 100%;
  padding: 0 !important;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    width: 0px;
    background-color: transparent;
  }
`;

const SidebarLayout: React.FC = () => {
  const [ref, { width }] = useMeasure<HTMLElement>();
  const [set] = useClientStore((state) => [state.set]);

  React.useLayoutEffect(() => {
    set((draft) => {
      draft.sidebarWidth = width + 64;
    });
  }, [width, set, ref]);

  return (
    <SidebarLayoutContainer ref={ref}>
      <SidebarLayoutInnerContainer>
        <Grid.Container
          gap={2}
          direction="column"
          style={{ minHeight: "200px", height: "100%" }}
        >
          <SubtitleContainer direction="row" justify="center">
            <Subtitle />
          </SubtitleContainer>
          <SidebarCollapseGroupContainer xs>
            <SidebarCollapseGroup />
          </SidebarCollapseGroupContainer>
        </Grid.Container>
      </SidebarLayoutInnerContainer>
    </SidebarLayoutContainer>
  );
};

export default SidebarLayout;
