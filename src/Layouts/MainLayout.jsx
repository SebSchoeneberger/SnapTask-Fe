import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import Toast from "../Components/Toast";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
        <Footer />
        <Toast />
        </>
     );
}

export default MainLayout;
