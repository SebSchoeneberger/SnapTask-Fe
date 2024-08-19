import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

function ProtectedLayout() {
  const { user, loading } = useContext(AuthContext);

  return <>
  {!loading && <>{user ? <Outlet /> : <Navigate to="/login" />}</>}
  </>;
}

export default ProtectedLayout;
