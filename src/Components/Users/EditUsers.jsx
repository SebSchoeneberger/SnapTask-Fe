import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getToken } from "../../Utils/TokenUtils";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

// Edit user

export function UpdateUserModal({ userData, setEditModal, editModal, updateUsers }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: userData || {},
  });

  const [isLoading, setIsLoading] = useState(false);
  const token = getToken();

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  useEffect(() => {
    if (editModal) {
      document.getElementById("update_user_modal").show();
    } else document.getElementById("update_user_modal").close();
  }, [editModal]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${API_URL}/users/${userData._id}`,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User updated successfully!");
      setEditModal(false);
      updateUsers();
      // setUsers((prev) =>
      //   prev.map((user) =>
      //     user._id === response.data._id ? response.data : user
      //   )
      // );
    } catch (error) {
      console.error(error);
      toast.error(`Error updating user: ${error.response.data.error}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  function handleClose(e) {
    e.preventDefault();
    setEditModal(false);
  }
  if (!userData) return null;
  return (
    <dialog id="update_user_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-base-200 p-6 my-8 rounded-2xl min-w-[700px]">
        <div className="flex justify-between items-center gap-3 pb-4">
          <h3 className="text-2xl font-semibold text-left w-full max-w-xl">Update User</h3>
          <button
            type="button"
            className=""
            onClick={() => {
              reset(userData);
              setEditModal(false);
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form method="dialog" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 items-center" autoComplete="off">
          <div className="w-full flex flex-col items-start gap-2">
            <span className="label-text">First Name</span>
            <label className="w-full input input-bordered flex items-center gap-2">
              <input {...register("firstName")} name="firstName" label="First Name" placeholder="" />
            </label>
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <span className="label-text">Last Name</span>
            <label className="w-full input input-bordered flex items-center gap-2">
              <input {...register("lastName")} name="lastName" label="Last Name" placeholder="" />
            </label>
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <span className="label-text">Email Account*</span>
            <label className={`input input-bordered w-full relative flex items-center gap-2 ${errors.email ? "input-error" : ""}`}>
              <input
                type="email"
                placeholder=""
                name="email"
                className="w-full"
                {...register("email", {
                  required: "Email is required",
                })}
              />
            </label>
            {errors.email && (
              <span
                style={{
                  color: "red",
                  position: "absolute",
                  top: "350px",
                  fontSize: "12px",
                }}>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <span className="label-text">Account Type</span>
            <label>
              <select {...register("role", { required: "User role is required" })} name="role" className="select select-bordered">
                <option value="staff">Staff</option>
                <option value="manager">Manager</option>
              </select>
              {errors.role && <p style={{ color: "red" }}>{errors.role.message}</p>}
            </label>
          </div>
          <button type="submit" className="btn btn-primary rounded-2xl" disabled={errors.email || errors.role}>
            Update User
          </button>
        </form>
      </div>
    </dialog>
  );
}
