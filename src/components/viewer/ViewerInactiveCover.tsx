import * as React from "react";
import { Text, Spinner } from "@geist-ui/react";

import styles from "./Viewer.module.css";

export interface ViewerInactiveCoverProps {
  title: string;
  subtitle: string;
  spinner?: boolean;
}

const ViewerInactiveCover: React.FC<ViewerInactiveCoverProps> = ({
  title,
  subtitle,
  spinner = false,
}) => {
  return (
    <div className={styles.ViewerInactiveCover}>
      <Text h1>{title} {!!spinner && <Spinner size="large" style={{ display: "inline-flex" }} />}</Text>
      <Text className={styles.ViewerInactiveCoverSubtitle} type="secondary" p>
        {subtitle}
      </Text>
    </div>
  );
};

export default ViewerInactiveCover;
