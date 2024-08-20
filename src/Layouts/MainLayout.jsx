import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import Toast from "../Components/Toast";
import { AuthContext } from "../Context/AuthProvider";
import ColorProvider from "../Context/ColorProvider";

function MainLayout() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <ColorProvider>
        <Navbar />
        {user ? (
          <div className="flex">
            <Sidebar />
            <Outlet />
          </div>
        ) : (
          <Outlet />
        )}
      </ColorProvider>
      <Footer />
      <Toast />
    </>
  );
}

export default MainLayout;
