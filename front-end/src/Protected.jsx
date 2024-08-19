import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const Protected = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/404" /> : <Outlet />;
};

export default Protected;
