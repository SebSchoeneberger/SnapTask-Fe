import axios from "axios";
import { getToken } from "../../Utils/TokenUtils";
import { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";


const API_URL = import.meta.env.VITE_API_URL;

function ReportsTable() {
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const tasksUrl = `${API_URL}/tasks`;
    const token = getToken();

    useEffect(() => {

        axios.get(tasksUrl, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            setTasks(res.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setIsLoading(false);
        });
    },[])

    // Format the date as dd/mm/yyyy
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB'); // 'en-GB' format is dd/mm/yyyy
    };


    if (isLoading)
        return (
          <div className="min-h-screen  w-full m-auto text-left px-12  mb-8">
            <LoadingSpinner />
          </div>
        );

    return ( 
        <>
        <div className="min-h-screen w-full flex flex-col gap-6 mt-10 p-5">
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Task Records</p>
                <button
                    className="btn">
                    Download Report
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Area</th>
                            <th>Created By</th>
                            <th>Task Name</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Due Date</th>
                            <th>Delayed</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task._id} className="hover">
                                <td>{task.area.name}</td>
                                <td>{`${task.creator.firstName} ${task.creator.lastName}`}</td>
                                <td>{task.title}</td>
                                <td>{task.status}</td>
                                <td>{task.priority}</td>
                                <td>{formatDate(task.dueDate)}</td>
                                <td>{new Date(task.dueDate) < new Date() ? "Yes" : "No"}</td>
                                <td>{formatDate(task.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
     );
}

export default ReportsTable;