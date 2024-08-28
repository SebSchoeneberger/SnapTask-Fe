import React, { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

function ProtectedLayout() {
  const { user, loading } = useContext(AuthContext);

  return <>{!loading && <>{user ? <Outlet /> : <AutoRedirect />}</>}</>;
}

export default ProtectedLayout;

function AutoRedirect() {
  const { setStoredPath } = useContext(AuthContext);
  const location = useLocation();
  setStoredPath(location.pathname);
  // console.log("Path:" + location.pathname);
  return <Navigate to="/login" />;
}
