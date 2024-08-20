import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import Toast from "../Components/Toast";
import { AuthContext } from "../Context/AuthProvider";

function MainLayout() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      {user ? (
        <div className="flex">
          <Sidebar />
          <Outlet />
        </div>
      ) : (
        <Outlet />
      )}
      <Footer />
      <Toast />
    </>
  );
}

export default MainLayout;
