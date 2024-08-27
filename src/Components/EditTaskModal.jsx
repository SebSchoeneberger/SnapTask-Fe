import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import { getToken } from "../Utils/TokenUtils";

const API_URL = import.meta.env.VITE_API_URL;

const EditTaskModal = ({ taskData, updateTasks, onClose }) => {
    const { register, handleSubmit, setValue } = useForm();
    const token = getToken();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (taskData) {
            setValue("title", taskData.title);
            setValue("description", taskData.description);
            setValue("dueDate", taskData.dueDate);
            setValue("priority", taskData.priority);
             if (taskData.assignedTo )
             setValue("assignedTo", taskData.assignedTo.map(user => {
            if (!user)return null
            return user._id}));
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

    if (isLoading)
        return (
          <div className="min-h-screen border-[2px] border-base-content w-full text-left px-12">
            <LoadingSpinner />
          </div>
        );

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
                    <input 
                        type="text" 
                        placeholder="Task Name" 
                        {...register("title", { required: "Title is required" })} 
                        className="input input-bordered" 
                    />
                    <input 
                        type="text" 
                        placeholder="Description" 
                        {...register("description")} 
                        className="input input-bordered" 
                    />
                    <input 
                        type="date" 
                        {...register("dueDate")} 
                        className="input input-bordered" 
                    />
                    {/* Dropdown for Priority */}
                    <select 
                        {...register('priority', { required: "Priority is required" })} 
                        className="select input-bordered"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    
                    <button type="submit" className="btn" disabled={isLoading}>
                        Update
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default EditTaskModal;