import * as React from "react";
import SplitPane from "react-split-pane";
import { useModal, useTheme } from "@geist-ui/react";

import styles from "./MainLayout.module.css";
import SidebarLayout from "./sidebar/SidebarLayout";
import TopbarLayout from "./topbar/TopbarLayout";
import ViewerLayout from "./viewer/ViewerLayout";
import WelcomeModal from "./modals/WelcomeModal";

import { useURIHistoryStore, useURIStore } from "../data/uri";
import { useModalStore } from "../data/modal";

const MainLayout: React.FC = () => {
  const [showFirstTimeModal] = useURIHistoryStore((store) => [
    store.showFirstTimeModal,
  ]);

  const [currentRecord] = useURIStore((store) => [store.currentRecord]);

  const [setModalStore] = useModalStore((store) => [store.set]);

  const theme = useTheme();

  const { setVisible, bindings } = useModal();

  React.useEffect(() => {
    setVisible(showFirstTimeModal && !currentRecord);

    setModalStore((draft) => {
      draft.setWelcomeModalVisible = (visibility) => setVisible(visibility);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={styles.MainLayoutContainer}>
        <SplitPane
          resizerClassName={
            theme.type === "light" ? "Resizer ResizerLight" : "Resizer"
          }
          minSize={360}
          maxSize={820}
          split="vertical"
        >
          <SidebarLayout />
          <div className={styles.MainLayoutContentContainer}>
            <section className={styles.MainLayoutTopbarContainer}>
              <TopbarLayout />
            </section>
            <section className={styles.MainLayoutViewerContainer}>
              <ViewerLayout />
            </section>
          </div>
        </SplitPane>
      </section>
      <WelcomeModal setVisible={setVisible} bindings={bindings} />
    </>
  );
};

export default MainLayout;
