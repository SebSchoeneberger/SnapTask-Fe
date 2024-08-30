import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../Utils/TokenUtils";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = import.meta.env.VITE_API_URL;

const ReportsFilter = ({
    selectedArea,
    setSelectedArea,
    taskName,
    setTaskName,
    status,
    setStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    dueDate,
    setDueDate,
    isDelayed,
    setIsDelayed,
    createdBy,
    setCreatedBy,
  }) => {
    const [areas, setAreas] = useState([]);
    const [managers, setManagers] = useState([]);
    const [loadingAreas, setLoadingAreas] = useState(true);
    const [loadingManagers, setLoadingManagers] = useState(true);
  
    const token = getToken();
    const areasUrl = `${API_URL}/areas/`;
    const usersUrl = `${API_URL}/users`;

  // Fetching areas & Managers
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
        })
        .catch((error) => {
            toast.error("Error loading areas");
        })
        .finally(() => setLoadingAreas(false));
        
        axios.get(usersUrl, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            const managers = res.data.staff.filter(user => user.role === 'manager');
            setManagers(managers);    
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => setLoadingManagers(false));
        
    }, []);
    
    // Handle Area Change
    const handleAreaChange = (e) => {
        setSelectedArea(e.target.value);
    };

    // Handle Task Name Change
    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    };

    // Handle Status Change
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    // Handle Date Range Change
    const handleDateRangeChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    // Handle Due Date Change
    const handleDueDateChange = (date) => {
        setDueDate(date);
    };

    // Handle Delayed Toggle
    const handleDelayedChange = () => {
        setIsDelayed((prevState) => !prevState);
    };

    // Handle Created By Change
    const handleCreatedByChange = (e) => {
        setCreatedBy(e.target.value);
    };

    return (
        <div className="border-[2px] border-base-content border-opacity-40 w-full p-4 mx-8 mt-8">
          <h1 className="text-left font-bold text-lg">Records Filter</h1>
          <div className="flex gap-8">
            <div className="flex gap-2 items-start mt-4 flex-col">
              <p className="font-semibold">Area</p>
              <select
                onChange={handleAreaChange}
                value={selectedArea}
                className="select select-bordered max-w-xs font-semibold gradientselect w-[150px] px-3 py-1"
              >
                <option className="bg-base-200" value="All">
                  All
                </option>
                {areas.map((area, index) => (
                  <option key={index} className="bg-base-200" value={area._id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
    
            <div className="flex gap-2 items-start mt-4 flex-col">
              <p className="font-semibold">Task Name</p>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={taskName}
                onChange={handleTaskNameChange}
              />
            </div>
    
            <div className="flex gap-2 items-start mt-4 flex-col">
              <p className="font-semibold">Status</p>
              <select
                className="select select-bordered max-w-xs font-semibold gradientselect w-[150px] px-3 py-1"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="Status">All</option>
                <option value="New">New</option>
                <option value="Finished">Finished</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
    
            <div className="flex gap-2 items-start mt-4 flex-col">
              <p className="font-semibold">Due Date</p>
              <DatePicker
                selected={dueDate}
                onChange={handleDueDateChange}
                isClearable
                placeholderText="Select due date"
                className="input input-bordered w-full max-w-md px-2"
              />
            </div>
    
            <div className="flex gap-2 items-start mt-4 flex-col">
              <p className="font-semibold">Date Range</p>
              <DatePicker
                selected={startDate}
                onChange={handleDateRangeChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                isClearable
                placeholderText="Select date range"
                className="input input-bordered w-full max-w-md px-2"
              />
            </div>
    
            <div className="flex gap-2 items-start mt-4 flex-col">
              <p className="font-semibold pb-1">Delayed</p>
              <input
                type="checkbox"
                className="toggle toggle-lg toggle-error"
                checked={isDelayed}
                onChange={handleDelayedChange}
              />
            </div>
    
            <div className="flex gap-2 items-start mt-4 flex-col">
              <p className="font-semibold">Created by</p>
              <select
                value={createdBy}
                onChange={handleCreatedByChange}
                className="select select-bordered max-w-xs font-semibold gradientselect w-[150px] px-3 py-1"
              >
                <option className="bg-base-200" value="All">
                  All
                </option>
                {managers.map((manager, index) => (
                  <option key={index} className="bg-base-200" value={manager._id}>
                    {manager.firstName} {manager.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      );
    };
    
    export default ReportsFilter;
