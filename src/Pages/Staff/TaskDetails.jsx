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

    const body = status
      ? {
          status: status,
          steps: task.steps,
        }
      : {
          steps: task.steps,
        };

    // console.log(status);
    axious
      .put(url, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
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
    <div className="min-h-svh w-full pt-20 pb-28 bg-base-100">
      <div className="flex flex-col h-full justify-around items-center gap-3 px-1">
        <p className="text-4xl mt-2 text-primary">{task.title}</p>
        <p className="text-3xl mt-2">{area}</p>
        {status == "Finished" ? (
          <p className="text-2xl mt-1 text-success italic">Finished on: {formatDateFull(task.finishedDate || new Date())}</p>
        ) : (
          <p className="text-2xl mt-1">Due date: {formatDateShort(task.dueDate)}</p>
        )}
        <p className="text-xl mt-2 text-justify px-4">Priority: {task.priority}</p>
        <p className="text-2xl mt-2 text-justify px-4">{task.description}</p>

        <div className="text-xl italic flex flex-col gap-2">
          {task.steps.map((step, index) => (
            <TaskStep key={index} step={step} index={index} checkbox={status == "In Progress"} setTask={setTask} task={task} />
          ))}
        </div>
        <div className="w-full mt-4 px-4">
          {status == "New" ? (
            <button onClick={startTask} className="btn btn-success btn-lg w-full md:max-w-lg ">
              Start Task
            </button>
          ) : (
            status == "In Progress" && (
              <div className="flex flex-col gap-8 w-full m-auto md:max-w-xl">
                <button disabled={!allStepsFinished} onClick={finishTask} className="btn btn-lg btn-error w-full">
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
