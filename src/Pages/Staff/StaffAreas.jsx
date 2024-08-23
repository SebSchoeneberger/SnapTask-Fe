import React from "react";
import { useState, useEffect, useContext } from "react";
import { getToken } from "../../Utils/TokenUtils";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../../Context/TaskProvider";

const API_URL = import.meta.env.VITE_API_URL;

function StaffAreas() {
  const { setArea } = useContext(TaskContext);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getToken();
  const navigate = useNavigate();

  const fetchAreas = () => {
    axios
      .get(`${API_URL}/areas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAreas(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        toast.error("Error loading areas");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  return (
    <>
      <div className="pt-20 w-full flex flex-col items-center">
        <h1 className="font-bold text-3xl py-4">Staff Areas</h1>
        <div className="flex flex-col md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
          {areas.map((area) => (
            <button
              key={area._id}
              onClick={() => {
                setArea(area.name);
                navigate(`/staff/tasks/${area._id}`);
              }}
              className="card bg-base-100 w-80 shadow-x flex flex-col justify-center items-start border hover:bg-base-300">
              <div className="card-body">
                <div className="flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                    />
                  </svg>
                  <h2 className="card-title font-bold">{area.name}</h2>
                </div>

                <div className="flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <p>{area.address}</p>
                </div>

                <div className="flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokelidth="1.5" stroke="currentColor" className="size-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                    />
                  </svg>
                  <p>{area.contact}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default StaffAreas;
