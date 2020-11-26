import { useEffect, useRef } from "react";

export const useLogLifecycle = (name) => {
  // Log "mount/unmount"
  useEffect(() => {
    console.log(
      `%c[${name}]%c Mount`,
      "font-weight:bold",
      "color:#666;background-color:#efe"
    );
    return () =>
      console.log(
        `%c[${name}]%c Destroy`,
        "font-weight:bold",
        "color:#666;background-color:#fee"
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // name should be an hardcoded string

  // Count updates
  const nbUpdates = useRef(0);
  useEffect(() => {
    if (nbUpdates.current > 0) {
      // Log updates, except first one (which is the mount)
      console.log(
        `%c[${name}]%c Update (${nbUpdates.current})`,
        "font-weight:bold",
        "color:#666;background-color:#eef"
      );
    }
    nbUpdates.current++;
  });
};
