import React from "react";
import { NavbarComp } from "../Navbar";

export const LayoutComp = ({ children }) => {
  return (
    <>
      <NavbarComp />
      <div>{children}</div>
    </>
  );
};
