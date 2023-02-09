import React from "react";
import FooterMenu from "../../Components/FooterMenu";
import Header from "../../Components/Header";

export default function LayoutProvider({ children }) {
  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      <div>{children}</div>
      <FooterMenu />
    </div>
  );
}
