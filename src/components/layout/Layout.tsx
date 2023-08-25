import React from "react";

import { ScrollToTop } from "components/sidebar";

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
      <Footer />
      <ScrollToTop />
    </div>
  );
};
