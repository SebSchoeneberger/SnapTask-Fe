import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getToken } from "../Utils/TokenUtils";
import LoadingSpinner from "../Components/LoadingSpinner";
import { toast } from "react-toastify";

const Reports = () => {
  const token = getToken();

  const API_URL = import.meta.env.VITE_API_URL;

  const [areas, setAreas] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(true);
  const [selectedArea, setSelectedArea] = useState("All");

  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  const areasUrl = `${API_URL}/areas/`;
  const tasksUrl = `${API_URL}/tasks/all/`;

  // Handle area
  function handleChange(e) {
    setSelectedArea(e.target.value);
  }

  // Handle tasks
  function handleChange(e) {
    setSelectedTask(e.target.value);
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
        setAreas(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.error(error);
        toast.error("Error loading areas");
      })
      .finally(() => setLoadingAreas(false));
  }, []);

  if (loadingAreas)
    return (
      <div className="min-h-screen  w-full m-auto text-left px-12  mb-8">
        <LoadingSpinner />
      </div>
    );

  // Getting tasks
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
        // console.log(response.data);
      })
      .catch((error) => {
        // console.error(error);
        toast.error("Error loading tasks");
      })
      .finally(() => setLoadingTasks(false));
  }, []);

  if (loadingTasks)
    return (
      <div className="min-h-screen  w-full m-auto text-left px-12  mb-8">
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      <div className="flex gap-2 items-start mt-6 flex-col">
        <p className="font-semibold">Area</p>
        <select
          onChange={handleChange}
          value={selectedArea}
          className="font-semibold gradientselect w-[150px] px-3 py-1 bg-base-300"
        >
          <option className="bg-base-200 " value={"All"}>
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
      <div className="flex gap-2 items-start mt-6 flex-col">
        <p className="font-semibold">Area</p>
        <select
          onChange={handleChange}
          value={selectedTasks}
          className="font-semibold gradientselect w-[150px] px-3 py-1 bg-base-300"
        >
          <option className="bg-base-200 " value={"All"}>
            {"All"}
          </option>
          {areas.map((area, index) => {
            return (
              <option key={index} className="bg-base-200" value={task._id}>
                {task.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default Reports;
