import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
