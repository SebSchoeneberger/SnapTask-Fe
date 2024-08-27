import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getToken } from "../Utils/TokenUtils";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

// Create new user

export default function CreateUser({ setModalOpen, setUsers }) {
  const url = "http://localhost:3333/users";
  const token = getToken();
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    let password = "";
    for (let i = 0; i < 12; i++) {
      let choice = random(0, 3);
      if (choice === 0) {
        password += randomLower();
      } else if (choice === 1) {
        password += randomUpper();
      } else if (choice === 2) {
        password += randomSymbol();
      } else if (choice === 3) {
        password += random(0, 9);
      } else {
        i--;
      }
    }
    setPassword(password);
  };

  const random = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomLower = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return letters[random(0, letters.length - 1)];
  };

  const randomUpper = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[random(0, letters.length - 1)];
  };

  const randomSymbol = () => {
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
    return symbols[random(0, symbols.length - 1)];
  };

  useEffect(() => {
    generatePassword();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    axios
      .post(
        url,
        { ...data, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setUsers((prev) => [...prev, res.data]);
        setModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Error creating user: ${error.message}`);
      })
      .finally(() => {});
  }

  return (
    <div className="min-h-screen max-w-[900px] m-auto absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-base-200 p-6 my-8 rounded-2xl min-w-[700px]">
        <div className="flex justify-between items-center pt-4">
          <p className="text-2xl font-semibold text-left w-full max-w-xl">
            Create User
          </p>
          <button className="" onClick={() => setModalOpen(false)}>
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="submit"
          className="mt-4 flex items-start flex-col gap-3 pb-4"
          autoComplete="off"
        >
          <div className="label pb-0">
            <span className="label-text">First Name</span>
          </div>
          <label className="w-full input input-bordered flex items-center gap-2">
            <input
              {...register("firstName")}
              name="firstName"
              label="First Name"
              placeholder=""
            />
          </label>
          <div className="label pb-0">
            <span className="label-text">Last Name</span>
          </div>
          <label className="w-full input input-bordered flex items-center gap-2">
            <input
              {...register("lastName")}
              name="lastName"
              label="Last Name"
              placeholder=""
            />
          </label>
          <div className="label pb-0">
            <span className="label-text">Email Account*</span>
          </div>
          <label className="w-full input input-bordered flex items-center gap-2">
            <input
              {...register("email", { required: true })}
              name="email"
              label="Email Address"
              placeholder=""
              required={true}
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </label>
          <div className="label pb-0">
            <span className="label-text">Account Type*</span>
          </div>
          <label>
            <select
              {...register("role", { required: true })}
              name="role"
              className="select select-bordered"
            >
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
            </select>
            {errors.role && (
              <p style={{ color: "red" }}>{errors.role.message}</p>
            )}
          </label>
          <div className="label pb-0">
            <span className="label-text">Password*</span>
          </div>
          <label className="w-full input input-bordered flex items-center gap-2">
            <input
              {...register("password", { required: true })}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
              label="Password"
              placeholder=""
              required={true}
              className="w-full"
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
            <div className="flex justify-between gap-3">
              <button onClick={() => navigator.clipboard.writeText(password)}>
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
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
                </svg>
              </button>
              <button onClick={generatePassword}>
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
                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                  />
                </svg>
              </button>
            </div>
          </label>
          <button
            type="submit"
            className="btn btn-primary mt-6 w-full max-w-[10rem] m-auto"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

// Edit User

export function UpdateUserModal({ userData }) {
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

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${API_URL}/users/${userData._id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User updated successfully!");
      document.getElementById("update_user_modal").close();
      // setUsers((prev) =>
      //   prev.map((user) =>
      //     user._id === response.data._id ? response.data : user
      //   )
      // );
    } catch (error) {
      console.error(error);
      toast.error(`Error updating user: ${error.message}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  function handleClose(e) {
    e.preventDefault();
    document.getElementById("update_user_modal").close();
  }
  if (!userData) return null;
  return (
    <dialog
      id="update_user_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="min-h-screen max-w-[900px] m-auto absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-base-200 p-6 my-8 rounded-2xl min-w-[700px]">
          <div className="flex justify-between items-center pt-4">
            <p className="text-2xl font-semibold text-left w-full max-w-xl">
              Update User
            </p>
            <button className="" onClick={handleClose}>
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex items-start flex-col gap-3 pb-4"
            autoComplete="off"
          >
            <div className="label pb-0">
              <span className="label-text">First Name</span>
            </div>
            <label className="w-full input input-bordered flex items-center gap-2">
              <input
                {...register("firstName", {
                  required: "First Name is required",
                })}
                name="firstName"
                placeholder="First Name"
              />
              {errors.firstName && (
                <p style={{ color: "red" }}>{errors.firstName.message}</p>
              )}
            </label>
            <div className="label pb-0">
              <span className="label-text">Last Name</span>
            </div>
            <label className="w-full input input-bordered flex items-center gap-2">
              <input
                {...register("lastName", { required: "Last Name is required" })}
                name="lastName"
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p style={{ color: "red" }}>{errors.lastName.message}</p>
              )}
            </label>
            <div className="label pb-0">
              <span className="label-text">Email Account*</span>
            </div>
            <label className="w-full input input-bordered flex items-center gap-2">
              <input
                {...register("email", { required: "Email is required" })}
                name="email"
                placeholder="Email Address"
                required
              />
              {errors.email && (
                <p style={{ color: "red" }}>{errors.email.message}</p>
              )}
            </label>
            <div className="label pb-0">
              <span className="label-text">Account Type*</span>
            </div>
            <label>
              <select
                {...register("role", { required: "User role is required" })}
                name="role"
                className="select select-bordered"
              >
                <option value="manager">Manager</option>
                <option value="staff">Staff</option>
              </select>
              {errors.role && (
                <p style={{ color: "red" }}>{errors.role.message}</p>
              )}
            </label>
            <button
              type="submit"
              className="btn btn-primary mt-6 w-full max-w-[10rem] m-auto"
              disabled={isLoading}
            >
              Update User
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
