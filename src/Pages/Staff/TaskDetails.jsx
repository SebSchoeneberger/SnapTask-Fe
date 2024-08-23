import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
import axious from "axios";
import { getToken } from "../../Utils/TokenUtils";
import { toast } from "react-toastify";

export default function TaskDetails() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    if (!token) return;
    const url = `${API_URL}/tasks/${id}`;
    axious
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setTask(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response.data.error);
      })
      .finally(() => {});
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
      <div className="flex flex-col h-full justify-around items-center">
        <p className="text-4xl mt-2">{task.title}</p>
        <p className="text-2xl mt-2 text-justify px-4">{task.description}</p>
        <button className="btn btn-success btn-lg px-12 max-w-xs">Start Task</button>
      </div>
    </div>
  );
}
