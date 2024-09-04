import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { getToken } from "../../Utils/TokenUtils";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
import TaskCard from "./TaskCard";
import { TaskContext } from "../../Context/TaskProvider";

export default function StaffTasks() {
  const { area } = useContext(TaskContext);

  // const [area, setArea] = useState("All areas");
  const { id } = useParams();

  const API_URL = import.meta.env.VITE_API_URL;
  const getTasksUrl = `${API_URL}/tasks`;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const { user } = useContext(AuthContext);
  const token = getToken();

  useEffect(() => {
    const param = `area=${id}`;
    axios
      .get(`${getTasksUrl}?${param}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.tasks);
        const notFinishedTasks = res.data.tasks.filter((task) => task.status !== "Finished" && task.area && task.area._id == id);

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
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-svh w-full pt-16 pb-24 bg-base-100">
      <p className="font-bold text-3xl py-4">{area}</p>
      <div className="flex flex-col items-center w-full gap-2 px-4 h-full pb-20">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task._id} task={task} />)
        ) : (
          <>
            <div className=" flex items-center justify-center h-full w-full">
              <p className="text-3xl ">No tasks available</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
