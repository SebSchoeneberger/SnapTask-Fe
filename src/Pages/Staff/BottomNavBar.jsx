import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

export default function BottomNavBar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  document.querySelector("html").setAttribute("data-theme", "dim");

  return (
    <div className="flex justify-between fixed bottom-0 w-full bg-base-300 border-[1px] border-neutral-content border-opacity-25 ">
      <NavLink to="staff/dashboard" className="btn  rounded-none w-1/5 btn-lg">
        Dashboard
      </NavLink>
      <NavLink to="staff/tasks" className="btn  rounded-none w-1/5 btn-lg">
        Tasks
      </NavLink>
      <button onClick={() => nav("profile")} className="btn rounded-none w-1/5 btn-lg">
        Settings
      </button>
      <button className="btn rounded-none w-1/5 btn-lg">FAQ</button>
      <button onClick={() => logout()} className="btn  rounded-none w-1/5 btn-lg">
        Logout
      </button>
    </div>
  );
}
