import * as React from "react";
import SplitPane from "react-split-pane";
import { useTheme } from "@geist-ui/react";

import SidebarLayout from "./sidebar/SidebarLayout";
import TopbarLayout from "./topbar/TopbarLayout";
import ViewerLayout from "./viewer/ViewerLayout";

import styled from "styled-components";

const MainLayoutContainer = styled.section`
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const MainLayoutContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const MainLayoutTopbarContainer = styled.div`
  flex: none;
`;

const MainLayoutViewerContainer = styled.div`
  flex: 1 1 auto;
  width: 100%;
  max-height: 100%;
`;

const MainLayout: React.FC = () => {
  const theme = useTheme();

  return (
    <MainLayoutContainer>
      <SplitPane
        resizerClassName={
          theme.type === "light" ? "Resizer ResizerLight" : "Resizer"
        }
        minSize={40}
        defaultSize={360}
        maxSize={820}
        split="vertical"
      >
        <SidebarLayout />
        <MainLayoutContentContainer>
          <MainLayoutTopbarContainer>
            <TopbarLayout />
          </MainLayoutTopbarContainer>
          <MainLayoutViewerContainer>
            <ViewerLayout />
          </MainLayoutViewerContainer>
        </MainLayoutContentContainer>
      </SplitPane>
    </MainLayoutContainer>
  );
};

export default MainLayout;
