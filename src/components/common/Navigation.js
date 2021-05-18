import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav className="container-fluid">
      <NavLink to="/" exact activeStyle={activeStyle}>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/loans" activeStyle={activeStyle}>
        Loans
      </NavLink>
    </nav>
  );
}
