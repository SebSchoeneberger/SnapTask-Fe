import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { getToken } from "../../Utils/TokenUtils";
import LoadingSpinner from "../../Components/LoadingSpinner";

export default function StaffTasks() {
  const API_URL = import.meta.env.VITE_API_URL;
  const getTasksUrl = `${API_URL}/tasks`;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const token = getToken();

  useEffect(() => {
    console.log(token);
    axios
      .get(getTasksUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const notFinishedTasks = res.data.filter((task) => task.status !== "Finished");
        setTasks(notFinishedTasks);
        setLoading(false);
        // console.log(notFinishedTasks);
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
      <div className="min-h-screen w-full">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-svh w-full pt-16 pb-24 bg-base-100">
      <p className="font-bold text-3xl py-4">All Tasks</p>
      <div className="flex flex-col items-center w-full gap-2  px-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}

const TaskCard = ({ task }) => {
  return (
    <div className="card bg-base-300 text-base-content border-[1px] border-base-content border-opacity-25  w-full m-auto hover:cursor-pointer hover:bg-base-200 hover:border-opacity-50">
      <div className="card-body items-center text-center">
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-full items-center">
            <h2 className="card-title">{task.title}</h2>
            <h2 className="card-title text-sm font-semibold">{task.priority} priority</h2>
          </div>
          <div className="flex flex-col w-full items-center">
            <h2
              className={`card-title text-center m-auto px-4 text-sm py-1 ${
                task.status === "New" ? "bg-primary text-primary-content" : "bg-warning text-warning-content"
              }`}>
              {task.status}
            </h2>
            <h2 className="card-title text-sm">{new Date(task.dueDate).toLocaleDateString()}</h2>
          </div>

          {/* <div className="card-actions justify-end w-full">
            <button className="btn btn-primary text-lg font-bold rounded-full">{">"}</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
