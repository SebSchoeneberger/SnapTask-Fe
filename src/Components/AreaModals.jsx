import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { getToken } from "../Utils/TokenUtils";

const API_URL = import.meta.env.VITE_API_URL;


// Create new area Modal
export function CreateAreaModal() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext); 
    const token = getToken();

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            const areaData = {
                ...data,
                creator: user.id, 
            };
            const response = await axios.post(`${API_URL}/areas`, areaData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Area created successfully!");
            reset();
            document.getElementById('my_modal_5').close();
        } catch (error) {
            toast.error(`Error creating area: ${error.message}`);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    function handleClose(e) {
        e.preventDefault();
        document.getElementById('my_modal_5').close();
    };

    return ( 
        <>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <button type="button" onClick={handleClose} className="btn btn-square absolute top-4 right-4">
                 <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h3 className="font-bold text-lg">Area Management</h3>
            <p className="py-4 text-lg">Create a new Area</p>
                <form method="dialog" className="flex flex-col gap-3 items-center" onSubmit={handleSubmit(onSubmit)}>
                    <label className="input input-bordered flex items-center gap-2">
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
                            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                        />
                        </svg>
                        <input
                          type="text"
                          className="grow"
                          placeholder="Area Name"
                          {...register("name", { required: "Area name is required" })} />
                        </label>
                        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
    
                        <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>

                        <input
                          type="text"
                          className="grow"
                          placeholder="Location"
                          {...register("address")} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokelidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                    </svg>
                      <input
                          type="text"
                          className="grow"
                          placeholder="Contact Info"
                          {...register("contact")} />
                    </label>

                    <select className="select select-bordered w-full max-w-xs" defaultValue="">
                        <option value="" disabled>Assign Staff</option>
                        <option value="user1">User 1</option>
                        <option value="user2">User 2</option>
                        <option value="user3">User 3</option>
                        <option value="user4">User 4</option>
                    </select>

                    <button className="btn" type="submit" disabled={isLoading}>Create</button>
                </form>
        </div>
        </dialog>
        </>
     );
};


// Update Area Modal
export function UpdateAreaModal({ areaData }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: areaData || {}
    });
    const [isLoading, setIsLoading] = useState(false);
    const token = getToken();

    useEffect(() => {
        if (areaData) {
            reset(areaData);
        }
    }, [areaData, reset]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.put(`${API_URL}/areas/${areaData._id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Area updated successfully!");
            document.getElementById('update_area_modal').close();
        } catch (error) {
            toast.error(`Error updating area: ${error.message}`);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <dialog id="update_area_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <button type="button" onClick={() => document.getElementById('update_area_modal').close()} className="btn btn-square absolute top-4 right-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
                <h3 className="font-bold text-lg pb-5">Edit Area</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"/>
                        </svg>
                        <input
                            type="text"
                            className="grow"
                            placeholder="Area Name"
                            {...register("name", { required: "Area name is required" })}
                        />
                    </label>
                    {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}

                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                        </svg>
                        <input
                            type="text"
                            className="grow"
                            placeholder="Location"
                            {...register("address")}
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"/>
                        </svg>
                        <input
                            type="text"
                            className="grow"
                            placeholder="Contact Info"
                            {...register("contact")}
                        />
                    </label>

                    <button className="btn" type="submit" disabled={isLoading}>Update</button>
                </form>
                
            </div>
        </dialog>
    );
};

