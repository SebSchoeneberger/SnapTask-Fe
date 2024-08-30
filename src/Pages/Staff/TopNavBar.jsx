import logo from "../../assets/Logo.png";
import logoLight from "../../assets/Logo-white.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function TopNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  //   console.log(location.pathname);
  return (
    <div className="fixed top-0 z-20 border-b-[2px] border-opacity-30 px-4 py-2 border-base-content w-full bg-base-200 flex justify-between items-center">
      {window.history.length > 1 && location.pathname != "/staff/areas" ? (
        <button
          onClick={() => {
            navigate(-1);
            // window.history.back();
          }}
          className="btn btn-neutral btn-outline">
          Back
        </button>
      ) : (
        <div></div>
      )}
      <div className="flex justify-end items-center gap-4">
        <img className="w-12 h-12" src={logoLight} alt="" />
        <p className="text-2xl">SnapTask</p>
      </div>
    </div>
  );
}
