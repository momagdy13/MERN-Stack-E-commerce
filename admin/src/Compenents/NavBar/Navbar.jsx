import React from "react";
import "./Navbar.css";
import nav_logo from "../../assets/nav-logo.svg";
import nav_profile from "../../assets/nav-profile.svg";
export default function Navbar() {
  return (
    <div className="navbar">
      <img className="nav-logo" src={nav_logo} alt="" />
      <img className="nav-profile" src={nav_profile} alt="" />
    </div>
  );
}
