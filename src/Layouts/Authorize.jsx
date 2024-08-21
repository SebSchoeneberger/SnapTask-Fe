import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

function Authorize({ roles }) {
  const { user } = useContext(AuthContext);

  return <>
  {roles.includes(user.role) ? <Outlet /> : <Navigate to="/login" />}
  </>;
}

export default Authorize;
