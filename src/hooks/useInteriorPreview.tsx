import { useState, useEffect } from "react";

import { throttle } from "lodash";

export const useInteriorPreview = () => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(window.visualViewport?.width);

  const handleResize = throttle(() => {
    setWindowWidth(window.visualViewport?.width);
  }, 300);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { windowWidth };
};
