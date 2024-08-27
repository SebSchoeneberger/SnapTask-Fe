import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../Components/LoadingSpinner";
import { getToken } from "../Utils/TokenUtils";
import LineChart from "../Components/Dashboard/LineChart";
import DoughnutChart from "../Components/Dashboard/DoughnutChart";
import Pagination from "../Components/Dashboard/Pagination";
import TaskDetailsPopup from "../Components/Dashboard/TaskDetailsPopup";

function Dashboard() {
  const token = getToken();

  const API_URL = import.meta.env.VITE_API_URL;
  const [areas, setAreas] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [selectedArea, setSelectedArea] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);
  const [stats, setStats] = useState({
    recordsToday: 0,
    hoursWorked: 0,
    onTimeRate: 0,
    tasksRemaining: 0,
  });

  const [perPage, setPerPage] = useState("25");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [totalTasks, setTotalTasks] = useState(64);

  const areasUrl = `${API_URL}/areas/`;
  const tasksUrl = `${API_URL}/reports/dashboard/weeklyTasks/`;
  const statsUrl = `${API_URL}/reports/dashboard/stats/`;

  // Handle area change
  function handleChange(e) {
    setPage(1);
    setSelectedArea(e.target.value);
    if (e.target.value == "All") {
      setFilteredTasks(tasks);
    } else {
      const filteredTasks = tasks.filter((x) => x.area.name == e.target.value);
      setFilteredTasks(filteredTasks);
      //   console.log(filteredTasks);
    }
  }

  // Getting areas
  useEffect(() => {
    axios
      .get(areasUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAreas(response.data.areas);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.error(error);
        toast.error("Error loading areas");
      })
      .finally(() => setLoadingAreas(false));
  }, []);

  // Getting tasks within last week
  useEffect(() => {
    const param = selectedArea === "All" ? "" : `area=${selectedArea}`;
    axios
      .get(`${tasksUrl}?page=${page}&perPage=${perPage}&${param}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data.tasks);
        setFilteredTasks(response.data.tasks);
        setTotalTasks(response.data.totalResults);
        setTotalPages(response.data.totalPages);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.error(error);
        toast.error("Error loading areas");
      })
      .finally(() => setLoadingTasks(false));
  }, [selectedArea, perPage, page]);

  // Getting stats for dashboard
  useEffect(() => {
    // console.log(selectedArea);
    setLoadingTasks(true);
    const param = selectedArea === "All" ? "" : `?area=${selectedArea}`;

    axios
      .get(`${statsUrl}${param}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // params: {
        //   area: selectedArea,
        // },
      })
      .then((response) => {
        setStats(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.error(error);
        toast.error("Error loading stats");
      })
      .finally(() => setLoadingTasks(false));
  }, [selectedArea]);

  const borderMarkup = ""; //border-[2px] border-base-content p-3 my-4 font-semibold";

  // Handle per page change
  function handlePerPageChange(e) {
    setPage(1);
    setPerPage(e.target.value);
  }

  if (loadingAreas)
    return (
      <div className="min-h-screen  w-full m-auto text-left px-12  mb-8">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="min-h-screen border-[2px] border-base-content border-opacity-40 w-[80%] m-auto text-left px-12 mb-8">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center mt-6">
          <p className="font-semibold px-3 ">Area:</p>
          <select onChange={handleChange} value={selectedArea} className="font-semibold gradientselect w-[150px] px-3 py-1 bg-base-300">
            <option className="bg-base-200" value={"All"}>
              {"All"}
            </option>
            {areas.map((area, index) => {
              return (
                <option key={index} className="bg-base-200" value={area._id}>
                  {area.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="border-[2px] border-base-content p-8 mt-2 border-opacity-40">
          <div className="flex justify-between font-semibold flex-wrap">
            <div className="flex gap-2">
              <div className="border-[2px] border-base-content rounded-full h-16 w-16 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-9" viewBox="0 0 512 512">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="square"
                    strokeMiterlimit="10"
                    strokeWidth="44"
                    d="M465 127L241 384l-92-92M140 385l-93-93M363 127L236 273"
                  />
                </svg>
              </div>
              <div>
                <p>Records received today</p>
                <p className="text-3xl">{stats.recordsToday}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="border-[2px] border-base-content rounded-full h-16 w-16 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p>Hours worked</p>
                <p className="text-3xl">{stats.hoursWorked}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="border-[2px] border-base-content rounded-full h-16 w-16 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  viewBox="0 0 469 511.83"
                  className="size-8">
                  <path
                    fillRule="nonzero"
                    d="M321.07 456.77c.82-.39 1.65-.72 2.5-.98.79-.59 1.63-1.11 2.52-1.58 9.62-4.94 18.81-10.59 27.51-17.02 4.77-3.53 11.02-4.47 16.6-2.41 13.16 4.76 15.67 22.45 4.46 30.75a235.796 235.796 0 0 1-32.47 20.1c-1.07.55-2.17.97-3.27 1.28-.73.53-1.52 1-2.34 1.41l-.23.11.02.03c-58.28 28.14-122.45 29.99-179.1 10.24-56.65-19.76-105.76-61.12-133.9-119.39-28.14-58.28-29.99-122.45-10.24-179.1C32.88 143.56 74.25 94.45 132.52 66.3c20.37-9.83 41.47-16.46 62.73-20.08 17.92-3.05 35.95-3.96 53.73-2.84L239 33.97c-7.91-7.44-8.29-19.88-.85-27.78 7.44-7.91 19.88-8.29 27.78-.85l39.9 37.61c1.55 1.46 2.8 3.1 3.77 4.86 5.59 7.91 4.59 18.94-2.71 25.69l-40.24 37.25c-7.95 7.35-20.35 6.87-27.71-1.08-7.35-7.95-6.87-20.35 1.08-27.7l3.85-3.57c-14.2-.68-28.56.15-42.83 2.58-18.01 3.06-35.91 8.69-53.21 17.04-49.53 23.92-84.68 65.65-101.46 113.77-16.79 48.13-15.2 102.67 8.72 152.21 23.92 49.53 65.65 84.68 113.77 101.46 26.62 9.29 55.21 12.95 83.83 10.32a20.3 20.3 0 0 1 2-.35c3.29-.35 6.56-.8 9.83-1.3.83-.12 1.67-.19 2.49-.2 18.31-3.04 36.49-8.71 54.05-17.19l.01.03zM196.86 182.24c0-10.03 8.13-18.16 18.16-18.16s18.16 8.13 18.16 18.16v110.52l75.64 33.25c9.17 4.04 13.33 14.74 9.3 23.9-4.04 9.17-14.74 13.33-23.91 9.29l-85.58-37.61c-6.87-2.59-11.77-9.22-11.77-17.01V182.24zM398.65 390.9c-4.04 5.92-4.21 13.31-.48 19.42 6.77 10.72 22.22 11.15 29.48.73 7.32-10.65 13.58-21.37 19.14-33.04 6.16-13.08-5.13-27.62-19.35-24.87-5.57 1.15-10.11 4.62-12.56 9.77-4.71 9.89-10.03 18.97-16.23 27.99zm33.83-89.98c-1.65 15.74 16.47 25.54 28.76 15.56 3.62-3.03 5.8-7.01 6.34-11.71 1.41-12.66 1.76-25.4 1.09-38.11-.76-14.57-17.99-21.96-29.08-12.49-4.2 3.57-6.46 8.87-6.17 14.37.55 10.83.27 21.6-.94 32.38zm-12.61-95.64c5.76 14.64 26.4 15 32.65.54 1.83-4.29 1.93-9.06.22-13.41a233.5 233.5 0 0 0-16.64-34.27c-6.06-10.15-19.9-11.67-28.07-3.11-5.4 5.83-6.31 14.18-2.33 21.06 5.5 9.36 10.24 19.07 14.17 29.19zm-55.55-78.75c12.22 10.38 30.7.67 29.07-15.31-.51-4.52-2.6-8.45-6.02-11.44-9.69-8.33-19.91-15.81-30.81-22.48-12.92-7.88-29.15 3.13-26.6 18.06.93 5.07 3.77 9.37 8.19 12.07 9.29 5.71 17.9 11.98 26.17 19.1z"
                  />
                </svg>
              </div>
              <div>
                <p>On time finished rate</p>
                <p className="text-3xl">{stats.onTimeRate * 100}%</p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="border-[2px] border-base-content rounded-full h-16 w-16 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                  <path
                    fillRule="evenodd"
                    d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p>Tasks remaining</p>
                <p className="text-3xl">{stats.tasksRemaining}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center flex-wrap">
          <div className="w-2/3 p-8 rounded-xl border-[0px] border-primary">
            <LineChart tasks={filteredTasks} />
          </div>
          <div className="w-1/3 p-4 rounded-xl border-[0px] border-primary">
            <DoughnutChart tasks={filteredTasks} />
          </div>
        </div>

        <div className="flex flex-col gap-6 ">
          <p className="text-xl font-semibold pl-3">Last records this week</p>

          {!loadingTasks ? (
            <div className="overflow-x-auto ">
              <table className="table table-sm w-full ">
                <thead className="">
                  <tr>
                    <th className="font-bold">Area</th>
                    <th className="font-bold">Created by</th>
                    <th className="font-bold">Task Name</th>
                    <th className="font-bold">Status</th>
                    <th className="font-bold">Priority</th>
                    <th className="font-bold">Due Date</th>
                    <th className="font-bold">Created on</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => {
                    return (
                      <tr
                        key={task._id}
                        className="hover:bg-base-300 hover:cursor-pointer"
                        onClick={() => {
                          setSelectedTask(task);
                          document.getElementById("taskDetails").showModal();
                        }}>
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

              <Pagination page={page} setPage={setPage} totalPages={totalPages} perPage={perPage} setPerPage={setPerPage} totalResults={totalTasks} />

              <TaskDetailsPopup task={selectedTask} />
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
