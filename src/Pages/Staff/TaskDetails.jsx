import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
import axious from "axios";
import { getToken } from "../../Utils/TokenUtils";
import { toast } from "react-toastify";
import { formatDateShort, formatDateFull } from "../../Utils/DateUtils";
import { TaskContext } from "../../Context/TaskProvider";
import { TaskStep } from "../../Components/TaskSteps";

export default function TaskDetails() {
  const { area } = useContext(TaskContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const [allStepsFinished, setAllStepsFinished] = useState(false);
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

  useEffect(() => {
    if (!task) return;
    updateTask(null);
    let completed = task.steps.filter((step) => step.isCompleted).length;

    if (completed === task.steps.length) setAllStepsFinished(true);
    else setAllStepsFinished(false);
  }, [task]);

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
    if (status) setStatus(status);
    axious
      .put(
        url,
        {
          status,
          steps: task.steps,
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
    <div className="min-h-svh w-full pt-20 pb-28 bg-base-200">
      <div className="flex flex-col h-full justify-around items-center gap-3 px-2">
        <div className="p-4 flex flex-col gap-4 bg-base-100 rounded-lg shadow-md">
          <div className="flex items-start gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
            <p className="text-xl base-content mb-2 leading-normal text-start">
              {task.title}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex gap-1 items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                />
              </svg>
              <p className="text-xl">{area}</p>
            </div>
            <div className="flex justify-between min-w-[360px] gap-4">
              {status == "Finished" ? (
                <div className="flex gap-1 items-center justify-center text-success-content bg-success p-1 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <p className="text-xl">
                    {formatDateFull(task.finishedDate || new Date())}
                  </p>
                </div>
              ) : (
                <div className="flex gap-1 items-center justify-center text-warning-content bg-warning p-1 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <p className="text-xl">{formatDateShort(task.dueDate)}</p>
                </div>
              )}
              <p
                className={`text-xl text-justify ${
                  task.priority === "High"
                    ? "text-error"
                    : task.priority === "Medium"
                    ? "text-warning"
                    : "text-accent"
                }`}
              >
                {task.priority} priority
              </p>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-light">Additional Info:</span>
              <p className="text-lg mt-2 text-justify info-content">
                {task.description}
              </p>
            </div>
          </div>
        </div>

        <div className="text-xl italic flex flex-col gap-2 w-full rounded-lg">
          {task.steps.map((step, index) => (
            <TaskStep
              key={index}
              step={step}
              index={index}
              checkbox={status == "In Progress"}
              setTask={setTask}
              task={task}
            />
          ))}
        </div>
        <div className="w-full mt-4 px-4">
          {status == "New" ? (
            <button
              onClick={startTask}
              className="btn btn-success btn-lg w-full md:max-w-lg "
            >
              Start Task
            </button>
          ) : (
            status == "In Progress" && (
              <div className="flex flex-col gap-8 w-full m-auto md:max-w-xl">
                <button
                  disabled={!allStepsFinished}
                  onClick={finishTask}
                  className="btn btn-lg btn-error w-full"
                >
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
    </div>
  );
}
