import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../Utils/TokenUtils";
import LoadingSpinner from "../Components/LoadingSpinner";
import { toast } from "react-toastify";
import ReportsFilter from "../Components/Reports/ReportsFilter";
import ReportsTable from "../Components/Reports/ReportsTable";

const API_URL = import.meta.env.VITE_API_URL;

const Reports = () => {


  return (
    <>
    <div className="flex flex-col">
      <ReportsFilter />
      <ReportsTable />
    </div>
    </>
  );
};

export default Reports;
