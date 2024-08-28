import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="colored" />;
};

export default Toast;
