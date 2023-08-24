import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = (): JSX.Element => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      window.scrollTo(0, 0);
    };
  }, [pathname]);
  return <></>;
};
