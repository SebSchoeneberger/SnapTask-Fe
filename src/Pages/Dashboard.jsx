import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;
import LoadingSpinner from "../Components/LoadingSpinner";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [areas, setAreas] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [loadingAreas, setLoadingAreas] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [selectedArea, setSelectedArea] = useState("All");
  const areasUrl = `${API_URL}/areas/`;
  const tasksUrl = `${API_URL}/tasks/`;

  function handleChange(e) {
    setSelectedArea(e.target.value);
    if (e.target.value == "All") {
      setFilteredTasks(tasks);
      setTasksRemaining(tasks);
    } else {
      const filteredTasks = tasks.filter((x) => x.area.name == e.target.value);
      setFilteredTasks(filteredTasks);
      setTasksRemaining(filteredTasks);
      //   console.log(filteredTasks);
    }
  }

  useEffect(() => {
    axios
      .get(areasUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAreas(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.error(error);
        toast.error("Error loading areas");
      })
      .finally(() => setLoadingAreas(false));
  }, []);

  useEffect(() => {
    axios
      .get(tasksUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data);
        setFilteredTasks(response.data);
        const remaining = response.data.filter((x) => x.status == "New");
        setTasksRemaining(remaining);
        // console.log(remaining);
      })
      .catch((error) => {
        // console.error(error);
        toast.error("Error loading areas");
      })
      .finally(() => setLoadingTasks(false));
  }, []);

  const borderMarkup = "border-[2px] border-base-content p-3 my-4";

  if (loadingAreas || loadingTasks)
    return (
      <div className="min-h-screen border-[2px] border-base-content w-full text-left px-12">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="min-h-screen border-[2px] border-base-content w-full text-left px-12 ">
      <div className="flex flex-col gap-6">
        <p className="font-semibold text-lg px-3 mt-4">Areas</p>
        <select onChange={handleChange} value={selectedArea} className="font-semibold gradientselect w-[150px] px-3 py-2 bg-base-300">
          <option className="bg-base-200 " value={"All"}>
            {"All"}
          </option>
          {areas.map((area, index) => {
            return (
              <option key={index} className="bg-base-200" value={area.name}>
                {area.name}
              </option>
            );
          })}
        </select>

        <div className="border-[2px] border-base-content p-8 mt-4">
          <div className="flex justify-between font-semibold">
            <div>
              <p>Records received today</p>
              <p className="text-3xl">52</p>
            </div>
            <div>
              <p>Hours worked</p>
              <p className="text-3xl">52</p>
            </div>
            <div>
              <p>On time finished rate</p>
              <p className="text-3xl">90%</p>
            </div>
            <div>
              <p>Tasks remaining</p>
              <p className="text-3xl">{tasksRemaining.length}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 mt-10">
          <p className="text-xl font-semibold">Last records this week</p>
          <table className="table-fixed border-[1px] border-base-content w-full text-sm mb-16">
            <thead className={borderMarkup}>
              <tr>
                <th className={borderMarkup}>Area</th>
                <th className={borderMarkup}>Created by</th>
                <th className={borderMarkup}>Task Name</th>
                <th className={borderMarkup}>Status</th>
                <th className={borderMarkup}>Priority</th>
                <th className={borderMarkup}>Due Date</th>
                <th className={borderMarkup}>Created on</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => {
                return (
                  <tr key={task._id}>
                    <td className={borderMarkup}>{task.area.name}</td>
                    <td className={borderMarkup}>
                      {task.creator.firstName} {task.creator.lastName}
                    </td>
                    <td className={borderMarkup}>{task.title}</td>
                    <td className={borderMarkup}>{task.status}</td>
                    <td className={borderMarkup}>{task.priority}</td>
                    <td className={borderMarkup}>{new Date(task.dueDate).toLocaleDateString()}</td>
                    <td className={borderMarkup}>{new Date(task.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
