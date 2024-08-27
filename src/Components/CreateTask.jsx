import React, { useEffect, useState } from 'react'; 
import { useForm } from "react-hook-form"; 
import { toast } from "react-toastify"; 
import { getToken } from '../Utils/TokenUtils'; 
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const CreateTask = ({ isOpen, onClose, onCreate }) => { 
    const { register, handleSubmit, formState: { errors }, reset } = useForm(); 
    const [users, setUsers] = useState([]); 
    const [areas, setAreas] = useState([]); 
    const token = getToken();

    useEffect(() => {
        const fetchData = async () => { 
            try {
                const usersResponse = await axios.get(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` }, });
                const areasResponse = await axios.get(`${API_URL}/areas`, { headers: { Authorization: `Bearer ${token}` }, });

                setUsers(usersResponse.data);
                setAreas(areasResponse.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData();
    }, [token]);

    const createTask = async (data) => { 
        try { 
            const response = await axios.post(`${API_URL}/tasks`, data, { headers: { Authorization: `Bearer ${token}` }, }); 
            return response.data; 
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
            toast.success('Task created successfully!'); 
            onCreate(newTask); // Powiadom znad listę zadań, aby zaktualizować listę
        } catch (error) { 
            console.error("Failed to create task:", error); 
            toast.error('Failed to create task, please try again.'); 
        } 
    };

    useEffect(() => { 
        const dialog = document.getElementById('createTaskDialog'); 
        if (isOpen) { 
            dialog.showModal(); 
        } else { 
            dialog.close(); 
        } 
    }, [isOpen]);

    return ( 
        <dialog id="createTaskDialog" className="modal"> 
            <div className="modal-box flex flex-col"> 
                <div className="flex justify-between items-center mb-4"> 
                    <h3 className="font-bold text-lg">Create New Task</h3> 
                    <button type="button" onClick={() => { onClose(); const dialog = document.getElementById('createTaskDialog'); dialog.close(); }} className="btn btn-square"> 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> 
                        </svg> 
                    </button> 
                </div> 
                <form className="flex gap-8" onSubmit={handleSubmit(onSubmit)}> 
                    <div className="flex flex-col gap-4 w-1/2"> 
                        <div> 
                            <label className="block">Task Name</label> 
                            <input type="text" placeholder="Task Title" {...register('title', { required: "Title is required" })} className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`} /> 
                            {errors.title && <span className="text-red-600 text-sm">{errors.title.message}</span>} 
                        </div> 
                        <div> 
                            <label className="block">Task Description</label> 
                            <textarea placeholder="Task Description" {...register('description')} className="textarea input-bordered h-32 w-full" /> 
                        </div> 
                    </div> 
                    <div className="flex flex-col gap-4 w-1/2"> 
                        <div> 
                            <label className="block">Due Date</label> 
                            <input type="date" {...register('dueDate', { required: "Due date is required" })} className={`input input-bordered w-full ${errors.dueDate ? 'input-error' : ''}`} /> 
                            {errors.dueDate && <span className="text-red-600 text-sm">{errors.dueDate.message}</span>} 
                        </div> 
                        <div> 
                            <label className="block">Priority</label> 
                            <select {...register('priority', { required: "Priority is required" })} className={`select input-bordered w-full ${errors.priority ? 'input-error' : ''}`}> 
                                <option value="">Select Priority</option> 
                                <option value="High">High</option> 
                                <option value="Medium">Medium</option> 
                                <option value="Low">Low</option> 
                            </select> 
                            {errors.priority && <span className="text-red-600 text-sm">{errors.priority.message}</span>} 
                        </div> 
                        <div> 
                            <label className="block">Assign To</label> 
                            <select {...register('assignedTo')} className={`select input-bordered w-full ${errors.assignedTo ? 'input-error' : ''}`}> 
                                <option value="">Assign To</option> 
                                {users.map(user => ( 
                                    <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option> 
                                ))} 
                            </select> 
                        </div> 
                        <div> 
                            <label className="block">Select Area</label> 
                            <select {...register('area', { required: "Area selection is required" })} className={`select input-bordered w-full ${errors.area ? 'input-error' : ''}`}> 
                                <option value="">Select Area</option> 
                                {areas.map(area => ( 
                                    <option key={area._id} value={area._id}>{area.name}</option> 
                                ))} 
                            </select> 
                            {errors.area && <span className="text-red-600 text-sm">{errors.area.message}</span>} 
                        </div> 
                        <button type="submit" className="btn" disabled={errors.title || errors.dueDate || errors.priority || errors.area}>Save Task</button> 
                    </div> 
                </form> 
            </div> 
        </dialog> 
    ); 
};

export default CreateTask;