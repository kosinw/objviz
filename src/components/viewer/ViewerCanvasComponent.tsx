import produce from "immer";
import * as React from "react";
import {
  Graph,
  GraphConfiguration,
  GraphData,
  GraphLink,
} from "react-d3-graph";

import styles from "./Viewer.module.css";

import { useSelectedStore } from "../../data/selection";

const config: Partial<GraphConfiguration<any, GraphLink>> & any = {
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
    // disableLinkForce: false,
  },
  node: {
    color: "#fff",
    fontColor: "#fff",
    fontSize: 10,
    fontWeight: "normal",
    highlightColor: "SAME",
    highlightFontSize: 10,
    highlightFontWeight: "bold",
    highlightStrokeColor: "#3291FF",
    highlightStrokeWidth: "SAME",
    labelProperty: (node: ViewerGraphNode) => `${node.type} (${node.dbid})`,
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
    color: "#333",
    fontColor: "#fff",
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
};

export type ViewerGraphNode = {
  id: string;
  type: string;
  dbid: number;
  [x: string]: any;
};

export type ViewerGraphFormat = GraphData<ViewerGraphNode, GraphLink>;

export interface ViewerCanvasComponentProps {
  data: ViewerGraphFormat;
}

const ViewerCanvasComponent: React.FC<ViewerCanvasComponentProps> = ({
  data,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const graphRef = React.useRef<any>(null);

  const [dimensions, setDimensions] = React.useState({
    width: 1,
    height: 1,
  });

  const [selectedNode, setSelectedNode] = useSelectedStore((store) => [
    store.selected,
    store.setSelected,
  ]);

  const [placedData, setPlacedData] = React.useState(
    produce(data, (draft) => {
      draft.nodes = draft.nodes.map((n) =>
        Object.assign({}, n, {
          x: n.x || Math.floor(Math.random() * (dimensions.width / 2)),
          y: n.y || Math.floor(Math.random() * (dimensions.height / 2)),
        })
      );
    })
  );

  const handleKeyPress = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.repeat) {
        return;
      }

      if (e.key === "r") {
        setPlacedData(
          produce((draft) => {
            draft.nodes = draft.nodes.map((n) =>
              Object.assign({}, n, {
                x: n.x || Math.floor(Math.random() * (dimensions.width / 2)),
                y: n.y || Math.floor(Math.random() * (dimensions.height / 2)),
              })
            );
          })
        );
      }
    },
    // eslint-disable-next-line
    [setPlacedData]
  );

  const updateSize = React.useCallback(() => {
    setDimensions({
      width: ref.current?.clientWidth || 1,
      height: ref.current?.clientHeight || 1,
    });
  }, [ref]);

  const handleNodeClick = (id: string) => {
    setSelectedNode(id);
  };

  React.useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, updateSize]);

  const newConfig = React.useMemo(
    () => Object.assign({}, config, { ...dimensions }),
    [dimensions]
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
    <div ref={ref} className={styles.ViewerCanvasComponentContainer}>
      <Graph
        onClickGraph={() => {
          if (selectedNode !== "") {
            setSelectedNode("");
          }
        }}
        onClickNode={handleNodeClick}
        ref={graphRef}
        data={finalData}
        id="ox-graph-canvas"
        config={newConfig}
      />
    </div>
  );
};

export default ViewerCanvasComponent;
