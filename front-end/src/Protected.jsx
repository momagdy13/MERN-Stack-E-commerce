import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const Protected = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/404" /> : <Outlet />;
};

export default Protected;
