import React from "react";

import { ScrollToTop } from "components";

import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="w-full">
      <Header />
      {children}
      <ScrollToTop />
      <Footer />
    </div>
  );
};
