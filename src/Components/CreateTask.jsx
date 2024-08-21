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
            const usersResponse = await axios.get(`${API_URL}/users`, { 
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}` 
                },
            });

            const areasResponse = await axios.get(`${API_URL}/areas`, { 
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}` 
                },
            });

            setUsers(usersResponse.data);
            setAreas(areasResponse.data);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };
        fetchData();
    }, [token]);

    const createTask = async (data) => { 
      const response = await axios.post(`${API_URL}/tasks`, data, { 
          headers: { 
              'Content-Type': 'application/json', 
              Authorization: `Bearer ${token}` 
          }, 
      });

      return response.data;
  };

    const onSubmit = async (data) => { 
        try { 
            await createTask({ 
                ...data, 
                creator: token.userId, 
                assignedTo: data.assignedTo ? [data.assignedTo] : [], 
            }); 
            onClose(); 
            reset(); 
            toast.success('Task created successfully!'); 
            // onCreate(); 
        } catch (error) { 
            console.error("Failed to create task:", error); 
            toast.error('Failed to create task, please try again.'); 
        } 
    };

    if (!isOpen) 
      
      // || !token || !token.isAdmin) 
      
      return null; 

    return ( 
        <div className="modal modal-open"> 
            <div className="card card-side bg-base-100 shadow-xl"> 
                <div className="card-body"> 
                    <h2 className="font-bold text-lg">Create New Task</h2> 
                    <form className="space-y-4 mt-4 grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>

                        {/* Left Column */}
                        <div className="flex flex-col space-y-4">
                            <div className="mt-2">
                                <label className="block">Task Name</label>
                                <input
                                    type="text"
                                    placeholder="Task Title"
                                    {...register('title', { required: true })} 
                                    className={`input w-full p-2 border rounded ${errors.title ? 'input-error' : 'border-gray-300'}`}
                                />
                                {errors.title && <span className="text-red-600 text-sm">Title is required</span>}
                            </div>

                            <div className="mt-2">
                                <label className="block">Task Description</label>
                                <textarea
                                    placeholder="Task Description"
                                    {...register('description')}
                                    className={`textarea w-full p-2 border rounded ${errors.description ? 'input-error' : 'border-gray-300'}`}
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col space-y-4">
                            <div>
                                <label className="block">Due Date</label>
                                <input
                                    type="date"
                                    {...register('dueDate', { required: true })}
                                    className={`input w-full p-2 border rounded ${errors.dueDate ? 'input-error' : 'border-gray-300'}`}
                                />
                                {errors.dueDate && <span className="text-red-600 text-sm">Due date is required</span>}
                            </div>

                            <div>
                                <label className="block">Priority</label>
                                <select
                                    {...register('priority', { required: true })}
                                    className={`select w-full p-2 border rounded ${errors.priority ? 'input-error' : 'border-gray-300'}`}
                                >
                                    <option value="">Select Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                                {errors.priority && <span className="text-red-600 text-sm">Priority is required</span>}
                            </div>

                            <div>
                                <label className="block">Assign To</label>
                                <select
                                    {...register('assignedTo')}
                                    className={`select w-full p-2 border rounded ${errors.assignedTo ? 'input-error' : 'border-gray-300'}`}
                                >
                                    <option value="">Assign To</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                                {errors.assignedTo && <span className="text-red-600 text-sm">Assignment is required</span>}
                            </div>

                            <div>
                                <label className="block">Select Area</label>
                                <select
                                    {...register('area', { required: true })} 
                                    className={`select w-full p-2 border rounded ${errors.area ? 'input-error' : 'border-gray-300'}`}
                                >
                                    <option value="">Select Area</option>
                                    {areas.map(area => (
                                        <option key={area._id} value={area._id}>{area.name}</option>
                                    ))}
                                </select>
                                {errors.area && <span className="text-red-600 text-sm">Area selection is required</span>}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Save Task</button>
                    </form>

                    <div className="mt-4">
                        <h3 className="font-semibold">QR Code</h3>
                        <p className="text-sm text-gray-600">QR code will be generated once the task is created.</p>
                    </div>

                    <div className="card-actions justify-end mt-6">
                        <button onClick={onClose} className="btn btn-secondary">Close</button>
                    </div>
                </div>
            </div>
        </div>
    ); 
};

export default CreateTask;