import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const activeStyle = { color: "#F15B2A" };
  return <h2 activeStyle={activeStyle}>Navigation here</h2>;
}
