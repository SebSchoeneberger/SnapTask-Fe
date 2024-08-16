import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedLayout() {
  const { userInfo } = useContext(AuthContext);

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedLayout;
