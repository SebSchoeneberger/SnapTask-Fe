import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Toast from "../Components/Toast";

function MainLayout() {
    return ( 
        <>
        <Navbar />
        <Outlet />
        <Footer />
        <Toast />
        </>
     );
}

export default MainLayout;