import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import Toast from "../Components/Toast";
import { AuthContext } from "../Context/AuthProvider";
import ColorProvider from "../Context/ColorProvider";
import BottomNavBar from "../Pages/Staff/BottomNavBar";
import TopNavBar from "../Pages/Staff/TopNavBar";

function MainLayout() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <ColorProvider>
        {user && user.role == "staff" ? <TopNavBar /> : <Navbar />}
        {user ? (
          <>
            <div className="flex">
              {user.role !== "staff" && <Sidebar />}
              <Outlet />
            </div>
            {user.role == "staff" && <BottomNavBar />}
          </>
        ) : (
          <Outlet />
        )}
      </ColorProvider>
      {user && user.role == "staff" ? <BottomNavBar /> : <Footer />}
      <Toast />
    </>
  );
}

export default MainLayout;
