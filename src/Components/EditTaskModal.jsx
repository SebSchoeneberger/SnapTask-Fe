import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import { getToken } from "../Utils/TokenUtils";

const API_URL = import.meta.env.VITE_API_URL;

const EditTaskModal = ({ taskData, updateTasks, onClose }) => {

    const { register, handleSubmit, setValue, formState: { errors },} = useForm();
    const token = getToken();
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        if (taskData) {
            setValue("title", taskData.title);
            console.log(taskData)
            setValue("description", taskData.description);
            setValue("dueDate", new Date(taskData.dueDate).toISOString().slice(0, 10));
            setValue("priority", taskData.priority);

            if (taskData.assignedTo) {
                setValue("assignedTo", taskData.assignedTo.map(user => user._id));
            }
        }
    }, [taskData, setValue]);

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

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await axios.put(`${API_URL}/tasks/${taskData._id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
    }
  }, [taskData, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axios.put(`${API_URL}/tasks/${taskData._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        <dialog className="modal modal-bottom sm:modal-middle" open>
            <div className="modal-box pt-6"> 
                <button 
                    type="button" 
                    onClick={onClose} 
                    className="btn btn-square absolute top-8 right-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h3 className="font-bold text-lg p-6">Edit Task</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <label className="label-text text-justify">Task Name</label> 
                    <input  
                        id="title"
                        type="text" 
                        placeholder="Task name"
                        {...register("title", {
                            required: "Task name is required" 
                        })} 
                        className={`input input-bordered w-full ${
                            errors.title ? "input-error" : ""
                        }`} 
                    />
                    {errors.title && (
                        <span
                            style={{
                                color: "red",
                                marginTop: "2px", 
                                fontSize: "12px",
                                textAlign: "left",  
                            }}
                        >
                            {errors.title.message}
                        </span>
                )}

                    <label className="label-text text-justify">Description</label>
                    <input 
                        id="description"
                        type="text" 
                        placeholder="Description" 
                        {...register("description")} 
                        className="input input-bordered" 
                    />

                    <label className="label-text text-justify">Date</label>
                    <input 
                            id="dueDate"
                            type="date" 
                            {...register("dueDate", {
                                required: "Due date is required" 
                            })} 
                            className={`input input-bordered w-full ${
                                errors.dueDate ? "input-error" : ""
                            }`} 
                        />
                        {errors.dueDate && (
                            <span
                                style={{
                                    color: "red",
                                    marginTop: "2px", 
                                    fontSize: "12px",
                                    textAlign: "left"
                                }}
                            >
                                {errors.dueDate.message}
                            </span>
                    )}

                    {/* Dropdown for Priority */}
                        <div className="w-full flex flex-col items-start gap-2">
                            <span className="label-text">Select Priority</span>
                            <label className="w-full relative">
                                <select
                                    {...register("priority", { required: "Priority is required" })}
                                    className={`select input-bordered w-full ${errors.priority ? "input-error" : ""}`}
                                >
                                    <option value="">Select Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </label>
                            {errors.priority && (
                                    <span className="text-red-500 text-sm">{errors.priority.message}</span>
                                )}
                        </div>
                    
                   {/* Dropdown for Status */}
                   <div className="w-full flex flex-col items-start gap-2">
                        <span className="label-text">Select Status</span>
                        <label className="w-full relative">
                            <select
                                {...register("status", ) }
                                className= "select input-bordered w-full"
                            >

                                <option value="">Select status</option>
                                <option value="New">New</option>
                                <option value="Finished">Finished</option>
                                <option value="Overdue">Overdue</option>
                            </select>
                        </label>
                    </div>
            
                    
                    {/* Dropdown for Area */}
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
                                    <span className="text-red-500 text-sm">{errors.area.message}</span>
                                )}
                    </div>

                    {/* Dropdown for Assign To */}
                    <div className="w-full flex flex-col items-start gap-2">
                        <span className="label-text">Assign to</span>
                        <label className="w-full">
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
                        </label>
                    </div>

                    
                    <button type="submit" className="btn" disabled={isLoading}>
                        Update
                    </button>
                </form>
            </div>
        </dialog>
    );
};


export default EditTaskModal;
