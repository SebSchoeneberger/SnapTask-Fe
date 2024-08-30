import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../Utils/TokenUtils";
import LoadingSpinner from "../Components/LoadingSpinner";
import { toast } from "react-toastify";
import ReportsFilter from "../Components/Reports/ReportsFilter";
import ReportsTable from "../Components/Reports/ReportsTable";

const API_URL = import.meta.env.VITE_API_URL;

const Reports = () => {
  const [selectedArea, setSelectedArea] = useState("All");
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("Finished");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [isDelayed, setIsDelayed] = useState(false);
  const [createdBy, setCreatedBy] = useState("All");
  const [selectedAreaName, setSelectedAreaName] = useState("All Areas");

  return (
    <div className="flex flex-col">
      <ReportsFilter
        setSelectedAreaName={setSelectedAreaName}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        taskName={taskName}
        setTaskName={setTaskName}
        status={status}
        setStatus={setStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        dueDate={dueDate}
        setDueDate={setDueDate}
        isDelayed={isDelayed}
        setIsDelayed={setIsDelayed}
        createdBy={createdBy}
        setCreatedBy={setCreatedBy}
      />
      <ReportsTable
        selectedAreaName={selectedAreaName}
        selectedArea={selectedArea}
        taskName={taskName}
        status={status}
        startDate={startDate}
        endDate={endDate}
        dueDate={dueDate}
        isDelayed={isDelayed}
        createdBy={createdBy}
      />
    </div>
  );
};

export default Reports;
