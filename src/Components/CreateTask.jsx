import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getToken } from "../Utils/TokenUtils";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const CreateTask = ({ isOpen, onClose, onCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [users, setUsers] = useState([]);
  const [areas, setAreas] = useState([]);
  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(`${API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const areasResponse = await axios.get(`${API_URL}/areas`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(usersResponse.data.staff);
        setAreas(areasResponse.data.areas);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [token]);

  const createTask = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.tasks;
    } catch (error) {
      console.error("API Error while creating task:", error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      const newTask = await createTask({
        ...data,
        creator: token.userId,
        assignedTo: data.assignedTo ? [data.assignedTo] : [],
        area: data.area,
      });
      reset();
      onClose();
      toast.success("Task created successfully");
      onCreate(newTask);
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Failed to create task, please try again.");
    }
  };

  useEffect(() => {
    const dialog = document.getElementById("createTaskDialog");
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <dialog
      id="createTaskDialog"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box flex flex-col bg-base-200 p-6 my-8 min-w-[700px]">
        <div className="flex justify-between items-center gap-3 pb-4">
          <h3 className="text-2xl font-semibold text-left w-full max-w-xl">
            Create Task
          </h3>
          <button
            type="button"
            onClick={() => {
              onClose();
              const dialog = document.getElementById("createTaskDialog");
              dialog.close();
            }}
            className=""
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-8 mb-6">
            <div className="flex flex-col gap-6 w-11/12">
              <div className="w-full flex flex-col items-start gap-2">
                <span className="label-text">Task Name</span>
                <label
                  className={`input input-bordered w-full relative flex items-center gap-2 ${
                    errors.title ? "input-error" : ""
                  }`}
                >
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
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder=""
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
                    }}
                  >
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col items-start gap-2">
                <span className="label-text">Task Description</span>
                <label className="w-full block">
                  <textarea
                    placeholder="Write a description..."
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
                    type="date"
                    {...register("dueDate", {
                      required: "Due date is required",
                    })}
                    className={`input input-bordered w-full ${
                      errors.dueDate ? "input-error" : ""
                    }`}
                  />
                </label>
                {errors.dueDate && (
                  <span
                    style={{
                      color: "red",
                      position: "absolute",
                      top: "150px",
                      fontSize: "12px",
                    }}
                  >
                    {errors.dueDate.message}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col items-start gap-2">
                <span className="label-text">Area Name</span>
                <label className="w-full relative">
                  <select
                    {...register("priority", {
                      required: "Priority is required",
                    })}
                    className={`select input-bordered w-full ${
                      errors.priority ? "input-error" : ""
                    }`}
                  >
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
                    }}
                  >
                    {errors.priority.message}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col items-start gap-2">
                <span className="label-text">Assign to</span>
                <label className="w-full">
                  <select
                    {...register("assignedTo")}
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
                </label>
              </div>
              <div className="w-full flex flex-col items-start gap-2">
                <span className="label-text">Select Area</span>
                <label className="w-full relative">
                  <select
                    {...register("area", {
                      required: "Area selection is required",
                    })}
                    className={`select input-bordered w-full ${
                      errors.area ? "input-error" : ""
                    }`}
                  >
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
                      top: "450px",
                      fontSize: "12px",
                    }}
                  >
                    {errors.area.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              errors.title || errors.dueDate || errors.priority || errors.area
            }
          >
            Save Task
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default CreateTask;
