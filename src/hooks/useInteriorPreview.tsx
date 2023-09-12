import { useState, useEffect } from "react";

import { throttle } from "lodash";

/**
 * @returns 현재 뷰포트 사이즈가 들어갑니다.
 */
export const useInteriorPreview = () => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(window.visualViewport?.width);

  const handleResize = throttle(() => {
    setWindowWidth(window.visualViewport?.width);
  }, 10);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { windowWidth };
};
