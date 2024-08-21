import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTask from "./CreateTask";
import { getToken } from "../Utils/TokenUtils";
import LoadingSpinner from "../Components/LoadingSpinner";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const TasksList = () => {
    const [tasks, setTasks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const tasksUrl = `${API_URL}/tasks`;
    const token = getToken();

    useEffect(() => {
        axios
            .get(tasksUrl, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                toast.error("Error loading tasks");
                console.log(error.message);
            })
            .finally(() => setLoading(false));
    }, [tasksUrl, token]);

    if (loading) {
        return (
            <div className="min-h-screen w-full text-left px-12">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 mt-10 p-5 w-full">
            <div className="flex justify-between items-center w-full">
                <p className="text-xl font-semibold">Task Management</p>
                <button className="btn w-auto" onClick={() => setModalOpen(true)}>
                    Create Task
                </button>
            </div>
            <div className="overflow-x-auto w-full">
                {tasks.length > 0 ? (
                    <table className="table w-full text-sm mb-16">
                        <thead>
                            <tr>
                                <th className="border-b-2">Task Name</th>
                                <th className="border-b-2">Description</th>
                                <th className="border-b-2">Due Date</th>
                                <th className="border-b-2">Priority</th>
                                <th className="border-b-2">Assigned To</th>
                                <th className="border-b-2">Area</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task._id} className="hover">
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                                    <td>{task.priority}</td>
                                    <td>{task.assignedTo ? task.assignedTo.map(user => user.name).join(", ") : "N/A"}</td>
                                    <td>{task.area ? task.area.name : "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No tasks found.</p>
                )}
            </div>
            {modalOpen && (
                <CreateTask isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            )}
        </div>
    );
};

export default TasksList;