import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import CreateTask from "./CreateTask";
import EditTaskModal from "../Components/EditTaskModal";
import TaskDetails from "../Components/TaskDetailsView";
import { getToken } from "../Utils/TokenUtils";
import LoadingSpinner from "../Components/LoadingSpinner";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;
const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const tasksUrl = `${API_URL}/tasks`;
  const token = getToken();
  const dropdownRef = useRef(null); // Create a ref for the dropdown
  useEffect(() => {
    axios
      .get(tasksUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data.tasks);
        // console.log(response.data.tasks);
      })
      .catch((error) => {
        toast.error("Error loading tasks");
        console.log(error.message);
      })
      .finally(() => setLoading(false));
  }, [tasksUrl, token]);
  const handleEdit = (task) => {
    setEditTask(task);
  };
  const updateTasks = () => {
    axios
      .get(tasksUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data.tasks);
      })
      .catch((error) => {
        toast.error("Error loading tasks");
        console.log(error.message);
      });
  };
  const handleDelete = (task) => {
    setDeleteTask(task);
    document.getElementById("delete_task_modal").showModal();
  };
  const deleteTaskHandler = () => {
    if (!deleteTask) return;
    axios
      .delete(`${API_URL}/tasks/${deleteTask._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== deleteTask._id));
        toast.success("Task deleted successfully");
      })
      .catch(() => {
        toast.error("Error deleting task");
      })
      .finally(() => {
        setDeleteTask(null);
        document.getElementById("delete_task_modal").close();
      });
  };
  const handleRowClick = (task) => {
    setSelectedTask(task);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      const openDropdown = document.querySelector("details[open]");
      if (openDropdown) {
        openDropdown.removeAttribute("open");
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen w-full text-left px-12">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 mt-10 p-5 min-h-screen w-full">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Task Management</p>
        <button className="btn" onClick={() => setModalOpen(true)}>
          Create Task
        </button>
      </div>
      {tasks.length > 0 ? (
        <div>
          <table className="table w-full">
            <thead>
              <tr>
                <th className="border-b-2"></th>
                <th className="border-b-2">Task Name</th>
                <th className="border-b-2">Description</th>
                <th className="border-b-2">Due Date</th>
                <th className="border-b-2">Status</th>
                <th className="border-b-2">Priority</th>
                <th className="border-b-2">Assigned To</th>
                <th className="border-b-2">Area</th>
                <th className="border-b-2"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr
                  key={task._id}
                  className="hover"
                  onClick={(e) => {
                    if (
                      !e.target.closest(".dropdown-content") &&
                      !e.target.closest(".dropdown")
                    ) {
                      handleRowClick(task);
                    }
                  }}
                >
                  <td className="font-bold">{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>{task.status}</td>
                  <td>{task.priority}</td>
                  <td>
                    {task.assignedTo && task.assignedTo.length > 0
                      ? task.assignedTo.map((user, userIndex) => (
                          <div key={userIndex}>
                            {user?.firstName} {user?.lastName}
                          </div>
                        ))
                      : " "}
                  </td>
                  <td>{task.area?.name}</td>
                  <td ref={dropdownRef}>
                    <details className="dropdown dropdown-end">
                      <summary className="btn m-0 p-0 border-none bg-transparent hover:bg-transparent">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                      </summary>
                      <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(task);
                            }}
                          >
                            Edit
                          </button>
                        </li>
                        <li className="text-red-600">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(task);
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No tasks found.</p>
      )}
      {modalOpen && !editTask && (
        <CreateTask
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreate={updateTasks}
        />
      )}
      {editTask && (
        <EditTaskModal
          taskData={editTask}
          updateTasks={updateTasks}
          onClose={() => setEditTask(null)}
        />
      )}
      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
      <dialog
        id="delete_task_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <button
            type="button"
            onClick={() => document.getElementById("delete_task_modal").close()}
            className="btn btn-square absolute top-4 right-4"
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
          <h3 className="font-bold text-lg">Delete Task</h3>
          <p>Are you sure you want to delete this Task?</p>
          <div className="modal-action flex justify-center">
            <button className="btn btn-error" onClick={deleteTaskHandler}>
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default TasksList;
