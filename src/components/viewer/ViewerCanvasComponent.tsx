import produce from "immer";
import * as React from "react";
import {
  Graph,
  GraphConfiguration,
  GraphData,
  GraphLink,
} from "react-d3-graph";

import styles from "./Viewer.module.css";
import { useToasts, useTheme } from "@geist-ui/react";

import { useSelectedStore } from "../../data/selection";
import { useQueryClient } from "react-query";
import { useKey, useTimeoutFn, useWindowSize } from "react-use";
import { useClientStore } from "../../data/client";
import { useClearQuery } from "../../hooks/disconnect";

export type ViewerGraphNode = {
  id: string;
  type: string;
  dbid: number;
  name: string;
  [x: string]: any;
};

export type ViewerGraphFormat = GraphData<ViewerGraphNode, GraphLink>;

export interface ViewerCanvasComponentProps {
  data: ViewerGraphFormat;
}

const ViewerCanvasComponent: React.FC<ViewerCanvasComponentProps> = ({
  data,
}) => {
  const theme = useTheme();

  const config: Partial<GraphConfiguration<any, GraphLink>> & any =
    React.useMemo(
      () => ({
        automaticRearrangeAfterDropNode: true,
        collapsible: false,
        directed: true,
        highlightDegree: 1,
        highlightOpacity: 1,
        nodeHighlightBehavior: true,
        linkHighlightBehavior: true,
        maxZoom: 8,
        minZoom: 0.5,
        panAndZoom: false,
        staticGraphWithDragAndDrop: false,
        staticGraph: false,
        d3: {
          alphaTarget: 0.05,
          gravity: -200,
          linkLength: 200,
          linkStrength: 1,
          disableLinkForce: false,
        },
        node: {
          color: theme.palette.foreground,
          fontColor: theme.palette.foreground,
          fontSize: 10,
          fontWeight: "normal",
          highlightColor: "SAME",
          highlightFontSize: 10,
          highlightFontWeight: "bold",
          highlightStrokeColor: "#3291FF",
          highlightStrokeWidth: "SAME",
          labelProperty: (node: ViewerGraphNode) =>
            `${node.type} (${node.name})`,
          mouseCursor: "pointer",
          opacity: 1,
          renderLabel: true,
          size: 400,
          strokeColor: "none",
          strokeWidth: 2,
          svg: "",
          symbolType: "circle",
        },
        link: {
          color: theme.palette.accents_2,
          fontColor: theme.palette.foreground,
          fontSize: 12,
          fontWeight: "normal",
          highlightColor: "#3291FF",
          highlightFontSize: 8,
          highlightFontWeight: "bold",
          mouseCursor: "pointer",
          opacity: 1,
          renderLabel: true,
          semanticStrokeWidth: true,
          strokeWidth: 1,
          markerHeight: 6,
          markerWidth: 6,
        },
      }),
      [theme]
    );

  const containerRef = React.useRef<HTMLDivElement>(null);
  const viewerRef = React.useRef<any>(null);
  const { clearQuery } = useClearQuery();

  const [dimensions, setDimensions] = React.useState({
    width: 1000,
    height: 1000,
  });

  const [isStatic, setStatic] = React.useState(false);

  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [topbarHeight, sidebarWidth] = useClientStore((state) => [
    state.topbarHeight,
    state.sidebarWidth,
  ]);

  const pause = () => {
    console.log("pausing");
    setStatic(true);
    viewerRef.current.pauseSimulation();
  };

  // stop after all animations 2 seconds
  const [, , reset] = useTimeoutFn(pause, 1500);

  const queryClient = useQueryClient();
  const [, setToast] = useToasts();

  const [selectedNode, setSelectedNode, setSelectedMeta, resetSelected] =
    useSelectedStore((store) => [
      store.selected,
      store.setSelected,
      store.setSelectedMeta,
      store.reset,
    ]);

  const setDimensionCallback = () => {
    pause();
    setStatic(false);
    reset();
    setDimensions({
      width: windowWidth - sidebarWidth,
      height: windowHeight - topbarHeight,
    });
  };

  // eslint-disable-next-line
  React.useEffect(setDimensionCallback, []);

  const placedData = produce(data, (draft) => {
    draft.nodes = draft.nodes.map((n) =>
      Object.assign({}, n, {
        x: n.x || Math.floor(Math.random() * (dimensions.width / 2)),
        y: n.y || Math.floor(Math.random() * (dimensions.height / 2)),
      })
    );
  });

  const handleResetQuery = React.useCallback(
    async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey) {
        return;
      }

      setToast({ text: "Refetching last executed query..." });
      await queryClient.invalidateQueries("getNetwork");
      setToast({ text: "Refetching finished!" });
    },
    [queryClient, setToast]
  );

  const handleClearQuery = React.useCallback(
    async (e: KeyboardEvent) => {
      if (!e.ctrlKey || !e.altKey) {
        return;
      }

      setToast({ text: "Clearing query..." });
      clearQuery();
      await queryClient.invalidateQueries("getNetwork");
    },
    [queryClient, setToast, clearQuery]
  );

  useKey(
    "r",
    (e) => {
      if (!e.ctrlKey || !e.altKey) {
        return;
      }

      setToast({ text: "Resetting viewport size..." });
      setDimensionCallback();
    },
    {},
    [windowWidth, windowHeight, sidebarWidth, topbarHeight]
  );

  useKey("q", handleResetQuery);
  useKey("c", handleClearQuery);
  useKey("d", (e) => {
    if (!e.ctrlKey || !e.altKey) {
      return;
    }

    resetSelected();
  });

  const handleNodeClick = (id: string) => {
    setSelectedNode(id);

    const idx = data.nodes.findIndex((n) => n.id === id);

    if (idx !== -1) {
      const { dbid: id, type } = data.nodes[idx];
      setSelectedMeta(id, type);
    }
  };

  const newConfig = React.useMemo(
    () =>
      Object.assign({}, config, {
        staticGraphWithDragAndDrop: isStatic,
        ...dimensions,
      }),
    [dimensions, isStatic, config]
  );

  const finalData = React.useMemo(() => {
    return produce(placedData, (draft) => {
      const idx = draft.nodes.findIndex((n) => n.id === selectedNode);

      if (idx !== -1) {
        draft.nodes[idx].color = "#3291FF";
        draft.nodes[idx].fontColor = "#3291FF";
      }
    });
  }, [placedData, selectedNode]);

  return (
    <div
      tabIndex={0}
      ref={containerRef}
      className={styles.ViewerCanvasComponentContainer}
    >
      <Graph
        ref={viewerRef}
        onClickNode={handleNodeClick}
        data={finalData}
        id="ox-graph-canvas"
        config={newConfig}
      />
    </div>
  );
};

export default ViewerCanvasComponent;
