import * as React from "react";
import {
  Graph,
  GraphConfiguration,
  GraphData,
  GraphLink,
} from "react-d3-graph";

import seedrandom from "seedrandom";
import produce from "immer";

import styles from "./Viewer.module.css";

const config: Partial<GraphConfiguration<any, GraphLink>> & any = {
  automaticRearrangeAfterDropNode: false,
  collapsible: false,
  directed: false,
  focusAnimationDuration: 0.75,
  focusZoom: 1,
  highlightDegree: 1,
  highlightOpacity: 1,
  linkHighlightBehavior: true,
  maxZoom: 8,
  minZoom: 0.25,
  nodeHighlightBehavior: true,
  panAndZoom: false,
  staticGraph: false,
  staticGraphWithDragAndDrop: true,
  d3: {
    alphaTarget: 0.05,
    gravity: -400,
    linkLength: 180,
    linkStrength: 1,
    disableLinkForce: true,
  },
  node: {
    color: "#fff",
    fontColor: "#fff",
    fontSize: 12,
    fontWeight: "normal",
    highlightColor: "SAME",
    highlightFontSize: 12,
    highlightFontWeight: "bold",
    highlightStrokeColor: "#3291FF",
    highlightStrokeWidth: "SAME",
    labelProperty: "label",
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: true,
    size: 500,
    strokeColor: "none",
    strokeWidth: 2,
    svg: "",
    symbolType: "circle",
  },
  link: {
    color: "#fff",
    fontColor: "#fff",
    fontSize: 12,
    fontWeight: "normal",
    highlightColor: "#3291FF",
    highlightFontSize: 8,
    highlightFontWeight: "bold",
    // labelProperty: "label",
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: true,
    semanticStrokeWidth: true,
    strokeWidth: 1.5,
    markerHeight: 6,
    markerWidth: 6,
    // strokeDasharray: 0,
    // strokeDashoffset: 0,
    // strokeLinecap: "butt",
  },
};

export type ViewerGraphNode = {
  id: string;
  type: string;
  label: string;
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

  // NOTE(kosi): Seeded random generator is used to figure out initial node positions
  const prng = seedrandom("openx");

  const [dimensions, setDimensions] = React.useState({
    width: 400,
    height: 400,
  });

  const newData = produce(data, (draft) => {
    draft.nodes = draft.nodes.map((x) => {
      return {
        ...x,
        x: prng() * (dimensions.width - 40) + 20,
        y: prng() * (dimensions.width - 40) + 20,
      };
    });
  });

  const updateSize = () => {
    setDimensions({
      width: ref.current?.offsetWidth || 400,
      height: ref.current?.offsetHeight || 400,
    });
  };

  React.useLayoutEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [ref]);

  return (
    <div ref={ref} className={styles.ViewerCanvasComponentContainer}>
      <Graph
        data={newData}
        id="ox-graph-canvas"
        config={Object.assign({}, config, { ...dimensions })}
      />
    </div>
  );
};

export default ViewerCanvasComponent;
