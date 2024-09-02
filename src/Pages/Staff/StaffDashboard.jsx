import axios from "axios";
import { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../../Context/AuthProvider";
import { getToken } from "../../Utils/TokenUtils";
import LoadingSpinner from "../../Components/LoadingSpinner";
import TaskCard from "./TaskCard";

function StaffDashboard() {
  const API_URL = import.meta.env.VITE_API_URL;
  const getTasksUrl = `${API_URL}/tasks`;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    // console.log(token);
    axios
      .get(getTasksUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const finishedTasks = res.data.tasks.filter(
          (task) => task.status == "Finished"
        );
        setTasks(finishedTasks);
        setLoading(false);
        // console.log(finishedTasks);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full overflow-hidden ">
        <LoadingSpinner />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="pt-20 w-full flex flex-col items-center ">
      <p className="font-bold text-3xl py-4 mb-4">Dashboard</p>
      <div className="flex flex-col items-center w-full gap-2  px-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default StaffDashboard;
