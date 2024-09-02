import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import { getToken } from "../Utils/TokenUtils";
import MultiselectComponent from "../Components/MutiselectComponent";
import TaskSteps from "./TaskSteps";

const API_URL = import.meta.env.VITE_API_URL;

const EditTaskModal = ({ taskData, updateTasks, onClose, taskUsers }) => {
  const [steps, setSteps] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const token = getToken();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [users, setUsers] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    if (taskData) {
      setValue("title", taskData.title);
      // console.log(taskData);
      setValue("description", taskData.description);
      setValue("dueDate", new Date(taskData.dueDate).toISOString().slice(0, 10));
      setValue("priority", taskData.priority);
      // console.log(taskData.area._id);
      setSteps(taskData.steps);
      if (taskData.assignedTo) {
        setValue(
          "assignedTo",
          taskData.assignedTo.map((user) => user._id)
        );
      }
    }
  }, [taskData, setValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const areasResponse = await axios.get(`${API_URL}/areas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAreas(areasResponse.data.areas);
        setValue("area", taskData.area._id);
        // console.log(usersResponse.data.staff);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data.staff);
      })
      .catch((error) => {
        toast.error("Error loading areas");
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      await axios.put(
        `${API_URL}/tasks/${taskData._id}`,
        { ...data, assignedTo: selectedUsers, steps },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Task updated successfully!");
      updateTasks();
      onClose();
    } catch (error) {
      toast.error(`Error updating task: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen border-[2px] border-base-content w-full text-left px-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <dialog className="modal modal-bottom sm:modal-middle bg-black bg-opacity-60" open>
      <div className="modal-box flex flex-col bg-base-200 p-6 my-8 min-w-[700px]">
        <div className="flex justify-between items-center gap-3 pb-4">
          <h3 className="text-2xl font-semibold text-left w-full max-w-xl">Edit Task</h3>
          <button type="button" onClick={onClose} className="">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex gap-8 mb-6">
            <div className="flex flex-col gap-6 w-11/12">
              <div className="w-full flex flex-col items-start gap-2">
                <span className="label-text">Task Name</span>
                <label className={`input input-bordered w-full relative flex items-center gap-2 ${errors.title ? "input-error" : ""}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <input
                    id="title"
                    type="text"
                    placeholder=""
                    className="w-full"
                    {...register("title", {
                      required: "Task name is required",
                    })}
                  />
                </label>
                {errors.title && (
                  <span
                    style={{
                      color: "red",
                      position: "absolute",
                      top: "150px",
                      fontSize: "12px",
                    }}>
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col items-start gap-2">
                <span className="label-text">
                  Task Description <span className="text-[12px]">(optional)</span>
                </span>
                <label className="w-full block">
                  <textarea
                    id="description"
                    placeholder="Write a description..."
                    type="text"
                    {...register("description")}
                    className="textarea input-bordered h-32 w-full"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-1/2">
              <div className="w-full flex flex-col items-start gap-2">
                <span className="label-text">Due Date</span>
                <label className="w-full relative">
                  <input
                    id="dueDate"
                    type="date"
                    {...register("dueDate", {
                      required: "Due date is required",
                    })}
                    className={`input input-bordered w-full ${errors.dueDate ? "input-error" : ""}`}
                  />
                </label>
                {errors.dueDate && (
                  <span
                    style={{
                      color: "red",
                      position: "absolute",
                      top: "150px",
                      fontSize: "12px",
                    }}>
                    {errors.dueDate.message}
                  </span>
                )}
              </div>
              {/* Dropdown for Priority */}
              <div className="w-full flex flex-col items-start gap-2">
                <span className="label-text">Priority</span>
                <label className="w-full relative">
                  <select
                    {...register("priority", {
                      required: "Priority is required",
                    })}
                    className={`select input-bordered w-full ${errors.priority ? "input-error" : ""}`}>
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </label>
                {errors.priority && (
                  <span
                    style={{
                      color: "red",
                      position: "absolute",
                      top: "250px",
                      fontSize: "12px",
                    }}>
                    {errors.priority.message}
                  </span>
                )}
              </div>

              {/* Dropdown for Status */}
              {/* <div className="w-full flex flex-col items-start gap-2">
                  <span className="label-text">Select Status</span>
                  <label className="w-full relative">
                    <select
                      {...register("status")}
                      className="select input-bordered w-full"
                    >
                      <option value="">Select status</option>
                      <option value="New">New</option>
                      <option value="Finished">Finished</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </label>
                </div> */}

              {/* Dropdown for Area */}
              <div className="w-full flex flex-col items-start gap-2">
                <span className="label-text">Select Area</span>
                <label className="w-full relative">
                  <select
                    {...register("area", {
                      required: "Area selection is required",
                    })}
                    className={`select input-bordered w-full ${errors.area ? "input-error" : ""}`}>
                    <option value="">Select Area</option>
                    {areas.map((area) => (
                      <option key={area._id} value={area._id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </label>
                {errors.area && (
                  <span
                    style={{
                      color: "red",
                      position: "absolute",
                      top: "480px",
                      fontSize: "12px",
                    }}>
                    {errors.area.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Dropdown for Assign To */}
          <div className="w-full flex flex-col items-start gap-2 mb-4">
            <span className="label-text">
              Assign to <span className="text-[12px]">(optional)</span>
            </span>
            {/* <label className="w-full">
                  <select
                    {...register("assignedTo")}
                    multiple
                    className={`select input-bordered w-full ${
                      errors.assignedTo ? "input-error" : ""
                    }`}
                  >
                    <option value="">Choose one or more</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.firstName} {user.lastName}
                      </option>
                    ))}
                  </select>
                </label> */}

            <MultiselectComponent
              users={users.filter((user) => user.role === "staff")}
              setSelectedUsers={setSelectedUsers}
              defaultSeleted={taskUsers}
              // {...register("assignedTo")}
              // styles={{
              //   color: "blue",
              // }}
            />
          </div>
          <TaskSteps steps={steps} setSteps={setSteps} />
          <button type="submit" className="btn btn-primary rounded-2xl" disabled={isLoading}>
            Update
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default EditTaskModal;
