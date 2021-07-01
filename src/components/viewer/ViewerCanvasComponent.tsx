import * as React from "react";
import {
  Graph,
  GraphConfiguration,
  GraphData,
  GraphLink,
  GraphNode,
} from "react-d3-graph";

import styles from "./Viewer.module.css";

const config: Partial<GraphConfiguration<GraphNode, GraphLink>> = {
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
    highlightStrokeColor: "blue",
    highlightStrokeWidth: "SAME",
    // labelProperty: "name",
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

export interface ViewerCanvasComponentProps {
  data: GraphData<GraphNode, GraphLink>;
}

const ViewerCanvasComponent: React.FC<ViewerCanvasComponentProps> = ({
  data,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({
    width: 400,
    height: 400,
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
        data={data}
        id="ox-graph-canvas"
        config={Object.assign({}, config, { ...dimensions })}
      />
    </div>
  );
};

export default ViewerCanvasComponent;
