import * as React from "react";
import useResizeObserver from "@react-hook/resize-observer";
import throttle from "lodash.throttle";

export const useSize = (target: React.RefObject<HTMLDivElement>) => {
  const [size, setSize] = React.useState<DOMRect>(new DOMRect(1, 1, 1, 1));

  React.useLayoutEffect(() => {
    setSize((draft) => target.current?.getBoundingClientRect() || draft);
  }, [target]);

  const callback = (entry: ResizeObserverEntry) => {
    setSize(entry.contentRect);
  };

  const throttledCallback = React.useMemo(
    () => throttle(callback, 750, { trailing: true, leading: false }),
    []
  );

  // Where the magic happens
  useResizeObserver(target, throttledCallback);
  return size;
};
