import produce from "immer";
import * as React from "react";
import {
  Graph,
  GraphConfiguration,
  GraphData,
  GraphLink,
} from "react-d3-graph";

import styled from "styled-components";
import { useToasts, useTheme, GeistUIThemes } from "@geist-ui/react";

import { useSelectedStore } from "../../data/selection";
import { useQueryClient } from "react-query";
import { useKey, useWindowSize, useThrottle } from "react-use";
import { useClientStore } from "../../data/client";
import { useClearQuery } from "../../hooks/disconnect";
import { GetNetworkResponse } from "../../api/network";
import { useThemeStore } from "../../data/theme";
import { QueryTree, useQueryStore } from "../../data/query";

export type ViewerGraphNode = {
  id: string;
  type: string;
  dbid: number;
  name: string;
  [x: string]: any;
};

const ViewerCanvasComponentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  overflow: hidden;
`;

export type ViewerGraphFormat = GraphData<ViewerGraphNode, GraphLink>;

export type ViewerCanvasComponentProps = {
  networkInfo: GetNetworkResponse;
  limit: number;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

const setupInitialPositions = (
  graph: ViewerGraphFormat,
  dimensions: { width: number; height: number }
) => {
  return produce(graph, (draft) => {
    const { width, height } = dimensions;

    draft.nodes = draft.nodes.map((n) =>
      Object.assign({}, n, {
        x: n.x || Math.floor(Math.random() * (width / 2)),
        y: n.y || Math.floor(Math.random() * (height / 2)),
      })
    );
  });
};

const mapNetworkInfoToViewerFormat = (
  response: GetNetworkResponse | undefined | null,
  limit: number = 100,
  theme: GeistUIThemes
): ViewerGraphFormat => {
  const nodes: ViewerGraphNode[] = [];
  const links: GraphLink[] = [];

  let skiplist: number[] = [];

  if (!response) {
    return { nodes, links };
  }

  const { network } = response;

  for (const key in network) {
    if (network[key].deleted === "1" && key !== "0") {
      skiplist = [parseInt(key), ...skiplist];
    }
  }

  for (const key in network) {
    if (parseInt(key) >= limit) {
      continue;
    }

    if (skiplist.includes(parseInt(key))) {
      continue;
    }

    const deadNode = !network[key].id;

    let color = deadNode
      ? theme.palette.errorLight
      : key === "0"
      ? theme.palette.violetLight
      : undefined;

    if (network[key].deleted === "1") {
      color = theme.palette.errorLight;
    }

    if (network[key].status !== "Active" && key !== "0") {
      color = theme.palette.accents_3;
    }

    nodes.push({
      id: key,
      type: network[key].type,
      dbid: network[key].id,
      name: !!network[key].name ? network[key].name : "",
      color,
      fontColor: color,
    });

    for (let i = 0; i < network[key].pointers_from.length; ++i) {
      const n = network[key].pointers_from[i];

      if (n !== null) {
        if (n >= limit) {
          continue;
        }

        if (skiplist.includes(n)) {
          continue;
        }

        links.push({ target: key, source: n.toString() });
      }
    }
  }

  return { nodes, links };
};

const ViewerCanvasComponent: React.FC<ViewerCanvasComponentProps> = ({
  networkInfo,
  limit,
  playing,
  setPlaying
}) => {
  const theme = useTheme();
  const themeStatus = useThemeStore((state) => state.theme);

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
        staticGraphWithDragAndDrop: playing ? false : true,
        d3: {
          alphaTarget: 0.05,
          gravity: -200,
          linkLength: 200,
          linkStrength: 1,
          disableLinkForce: playing ? undefined : true,
        },
        node: {
          color: theme.palette.foreground,
          fontColor: theme.palette.foreground,
          fontSize: 10,
          fontWeight: "normal",
          highlightColor: "SAME",
          highlightFontSize: 10,
          highlightFontWeight: "bold",
          highlightStrokeColor: theme.palette.successLight,
          highlightStrokeWidth: "SAME",
          labelProperty: (node: ViewerGraphNode) =>
            !!node.name
              ? `${node.type} (${truncate(node.name, 20)})`
              : node.type,
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
          color: theme.palette.accents_3,
          fontColor: theme.palette.foreground,
          fontSize: 12,
          fontWeight: "normal",
          highlightColor: theme.palette.successLight,
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
      // eslint-disable-next-line
      [themeStatus, theme, playing]
    );

  const containerRef = React.useRef<HTMLDivElement>(null);
  const viewerRef = React.useRef<any>(null);
  const { clearQuery } = useClearQuery();

  const [_dimensions, setDimensions] = React.useState({
    width: 1000,
    height: 1000,
  });

  const dimensions = useThrottle(_dimensions, 200);

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const [topbarHeight, sidebarWidth] = useClientStore((state) => [
    state.topbarHeight,
    state.sidebarWidth,
  ]);

  const [setQueries, lastQuery] = useQueryStore((state) => [
    state.set,
    state.lastQuery,
  ]);

  const queryClient = useQueryClient();
  const [, setToast] = useToasts();

  const [selectedNode, setSelectedNode, setSelectedMeta, resetSelected] =
    useSelectedStore((store) => [
      store.selected,
      store.setSelected,
      store.setSelectedMeta,
      store.reset,
    ]);

  React.useEffect(
    () =>
      setDimensions({
        width: windowWidth - sidebarWidth,
        height: windowHeight - topbarHeight,
      }),
    [sidebarWidth, topbarHeight, windowWidth, windowHeight]
  );

  useKey("q", async (e) => {
    if (!e.ctrlKey || !e.altKey) {
      return;
    }

    resetSelected();
    setToast({ text: "Refetching last executed query..." });
    await queryClient.invalidateQueries("getNetwork");
  });

  useKey("c", async (e) => {
    if (!e.ctrlKey || !e.altKey) {
      return;
    }

    setToast({ text: "Clearing query..." });
    clearQuery();
    await queryClient.invalidateQueries("getNetwork");
  });

  useKey("d", (e) => {
    if (!e.ctrlKey || !e.altKey) {
      return;
    }

    resetSelected();
  });

  const truncate = (target: string, length: number) => {
    return target.substring(0, length) + (length < target.length ? "..." : "");
  };

  const handleNodeClick = (id: string) => {
    setSelectedNode(id);

    const idx = data.nodes.findIndex((n) => n.id === id);

    if (idx !== -1) {
      const { dbid: id, type } = data.nodes[idx];
      setSelectedMeta(id, type);
    }
  };

  const handleNodeDoubleClick = async (id: string) => {
    const child = data.nodes.find((n) => n.id === id);

    if (!child || !lastQuery) {
      return;
    }

    if (
      "" + child.dbid === "" + lastQuery.id &&
      child.type === lastQuery.type
    ) {
      setToast({
        text: "Can't open subquery using parent node.",
      });

      return;
    }

    const subquery: QueryTree = {
      ...lastQuery,
      id: child.dbid,
      type: child.type,
    };

    setQueries((draft) => {
      draft.lastQuery = {
        ...subquery,
        prevQuery: {
          name: !!draft.lastQuery!.name
            ? draft.lastQuery!.name
            : networkInfo.network[0].name,
          ...draft.lastQuery!,
        },
        name: child.name,
      };

      resetSelected();
    });
  };

  const finalConfig = React.useMemo(
    () =>
      Object.assign({}, config, {
        ...dimensions,
      }),
    [dimensions, config]
  );

  // TODO(kosi): Refactor this so its not jank. Maybe do some functional programming stuff like composition???
  const data = React.useMemo(
    () =>
      produce(
        setupInitialPositions(
          mapNetworkInfoToViewerFormat(networkInfo, limit, theme),
          dimensions
        ),
        (draft) => {
          const idx = draft.nodes.findIndex((n) => n.id === selectedNode);

          if (idx !== -1) {
            draft.nodes[idx].color = theme.palette.successLight;
            draft.nodes[idx].fontColor = theme.palette.successLight;
          }
        }
      ),
    // eslint-disable-next-line
    [networkInfo, selectedNode, limit, theme, themeStatus, dimensions]
  );

  return (
    <ViewerCanvasComponentContainer tabIndex={0} ref={containerRef}>
      <Graph
        ref={viewerRef}
        onClickNode={handleNodeClick}
        onDoubleClickNode={handleNodeDoubleClick}
        data={data}
        id="graph-component"
        config={finalConfig}
      />
    </ViewerCanvasComponentContainer>
  );
};

export default ViewerCanvasComponent;
