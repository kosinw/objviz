import * as React from "react";
import { Text, Dot } from "@geist-ui/react";

import { useQuery } from "react-query";
import { useURIStore } from "../../data/uri.store";
import { verifyURI } from "../../api/uri.api";

const TopbarStatusIndicator: React.FC = () => {
  const [currentRecord, setURIStore] = useURIStore((store) => [
    store.currentRecord,
    store.set,
  ]);
  const { isLoading, data } = useQuery(
    ["verifyURI", { uri: currentRecord }],
    () => verifyURI(currentRecord)
  );

  const [text, textColor, dotColor]: [
    string,
    "default" | "secondary",
    "success" | "default"
  ] = React.useMemo(
    () =>
      !!data
        ? ["Connected", "default", "success"]
        : ["Disconnected", "secondary", "default"],
    [data]
  );

  if (isLoading) {
    return (
      <Dot>
        <Text type="secondary" small>
          Loading
        </Text>
      </Dot>
    );
  }

  return (
    <Dot
      onClick={() => {
        if (data) {
          setURIStore((draft) => {
            draft.currentRecord = null;
          });
        }
      }}
      type={dotColor}
    >
      <Text type={textColor} small>
        {text}
      </Text>
    </Dot>
  );
};

export default TopbarStatusIndicator;
