import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
import axious from "axios";
import { getToken } from "../../Utils/TokenUtils";
import { toast } from "react-toastify";
import { formatDateShort, formatDateFull } from "../../Utils/DateUtils";
import { TaskContext } from "../../Context/TaskProvider";

export default function TaskDetails() {
  const { area } = useContext(TaskContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const token = getToken();
  const url = `${API_URL}/tasks/${id}`;

  useEffect(() => {
    if (!token) return;
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
        setStatus(res.data.status);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response.data.error);
      })
      .finally(() => {});
  }, []);

  function startTask() {
    updateTask("In Progress");
  }

  function finishTask() {
    updateTask("Finished");
  }

  function cancelTask() {
    updateTask("New");
  }

  function updateTask(status) {
    setStatus(status);
    axious
      .put(
        url,
        {
          status: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setStatus(res.data.status);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      })
      .finally(() => {});
  }

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
        <p className="text-3xl mt-2">{area}</p>
        {task.status == "Finished" ? (
          <p className="text-2xl mt-1">Finished on: {formatDateFull(task.finishedDate)}</p>
        ) : (
          <p className="text-2xl mt-1">Due date: {formatDateShort(task.dueDate)}</p>
        )}
        <p className="text-2xl mt-2 text-justify px-4">{task.description}</p>
        {status == "New" ? (
          <button onClick={startTask} className="btn btn-success btn-lg w-full md:max-w-lg">
            Start Task
          </button>
        ) : (
          status == "In Progress" && (
            <div className="flex flex-col gap-8 w-full px-8 md:max-w-xl">
              <button onClick={finishTask} className="btn btn-lg btn-error w-full">
                Finish Task
              </button>
              <button onClick={cancelTask} className="btn btn-lg btn-neutral">
                Cancel
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
