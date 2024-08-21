import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getToken } from "../Utils/TokenUtils";

export default function CreateUser({ closeModal, setUsers }) {
  const url = "http://localhost:3333/users";
  const nav = useNavigate();
  const token = getToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers((prev) => [...prev, res.data]);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
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
          <button className="" onClick={closeModal}>
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
            {errors.email && <p>Email is required.</p>}
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
            {errors.role && <p>User role is required.</p>}
          </label>
          <div className="label pb-0">
            <span className="label-text">Password*</span>
          </div>
          <label className="w-full input input-bordered flex items-center gap-2">
            <input
              {...register("password", { required: true })}
              name="password"
              label="Password"
              placeholder=""
              required={true}
            />
            {errors.email && <p>Password is required.</p>}
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
