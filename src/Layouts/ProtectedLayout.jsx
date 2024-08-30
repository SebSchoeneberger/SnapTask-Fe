import React, { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

function ProtectedLayout() {
  const { setStoredPath, loading, user } = useContext(AuthContext);
  if (!user) setStoredPath(useLocation().pathname);

  return <>{!loading && <>{user ? <Outlet /> : <Navigate to="/login" />}</>}</>;
}

export default ProtectedLayout;
