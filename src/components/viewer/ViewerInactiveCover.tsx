import * as React from "react";
import { Text } from "@geist-ui/react";

import styles from "./Viewer.module.css";

export interface ViewerInactiveCoverProps {
  title: string;
  subtitle: string;
}

const ViewerInactiveCover: React.FC<ViewerInactiveCoverProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className={styles.ViewerInactiveCover}>
      <Text h1>{title}</Text>
      <Text className={styles.ViewerInactiveCoverSubtitle} type="secondary" p>
        {subtitle}
      </Text>
    </div>
  );
};

export default ViewerInactiveCover;
