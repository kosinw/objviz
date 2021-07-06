import * as React from "react";
import { Text } from "@geist-ui/react";
import styles from "./Subtitle.module.css";

export interface SubtitleProps {
  value?: string;
}

/**
 * Subtitle text component. Used as text styling for second line of modals and top of sidebar.
 *
 * @param {object} props Component props
 * @param {string} props.value Value of subtitle
 */
const Subtitle: React.FC<SubtitleProps> = ({
  value = "Database Object Visualizer",
}) => {
  return (
    <Text span type="secondary" className={styles.Subtitle}>
      {value}
    </Text>
  );
};

export default Subtitle;
