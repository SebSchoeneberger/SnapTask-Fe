import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getToken } from "../../Utils/TokenUtils";
import { toast } from "react-toastify";
import { generatePassword } from "../../Utils/PassGenerator";

const API_URL = import.meta.env.VITE_API_URL;

// Create new user

export function CreateUser({ setUsers, name }) {
  const url = "http://localhost:3333/users";
  const token = getToken();
  const [password, setPassword] = useState(generatePassword());

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
        document.getElementById(name).close();
        reset();
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Error creating user: ${error.response.data.error}`);
      })
      .finally(() => {});
  }

  useEffect(() => setPassword(generatePassword()), [reset]);

  return (
    <>
      <dialog id={name} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-200 p-6 my-8 rounded-2xl min-w-[700px]">
          <div className="flex justify-between items-center gap-3 pb-4">
            <h3 className="text-2xl font-semibold text-left w-full max-w-xl">
              Create User
            </h3>
            <button
              type="button"
              className=""
              onClick={() => {
                reset();
                setPassword(generatePassword());
                document.getElementById(name).close();
              }}
            >
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
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
            action="submit"
            className="flex flex-col gap-6 items-center"
            autoComplete="off"
          >
            <div className="w-full flex flex-col items-start gap-2">
              <span className="label-text">First Name</span>
              <label className="w-full input input-bordered flex items-center gap-2">
                <input
                  {...register("firstName")}
                  name="firstName"
                  label="First Name"
                  placeholder=""
                  className="w-full"
                />
              </label>
            </div>
            <div className="w-full flex flex-col items-start gap-2">
              <span className="label-text">Last Name</span>
              <label className="w-full input input-bordered flex items-center gap-2">
                <input
                  {...register("lastName")}
                  name="lastName"
                  label="Last Name"
                  placeholder=""
                  className="w-full"
                />
              </label>
            </div>
            <div className="w-full flex flex-col items-start gap-2">
              <span className="label-text">Email Account*</span>
              <label
                className={`input input-bordered w-full relative flex items-center gap-2 ${
                  errors.email ? "input-error" : ""
                }`}
              >
                <input
                  type="text"
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
                  }}
                >
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-2">
              <span className="label-text">Account Type</span>
              <label>
                <select
                  name="role"
                  {...register("role", {
                    required: "Account type is required",
                  })}
                  className={`select input-bordered w-full ${
                    errors.role ? "input-error" : ""
                  }`}
                >
                  {/* <option value="">Choose one</option> */}
                  <option value="staff">Staff</option>
                  <option value="manager">Manager</option>
                </select>
              </label>
              {errors.role && (
                <span
                  style={{
                    color: "red",
                    position: "absolute",
                    top: "500px",
                    fontSize: "12px",
                  }}
                >
                  {errors.role.message}
                </span>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-2">
              <span className="label-text">Password*</span>
              <label
                className={`input input-bordered w-full relative flex items-center gap-2 ${
                  errors.password ? "input-error" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder=""
                  name="password"
                  className="w-full"
                  value={password}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex justify-between gap-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(password)}
                  >
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
              {errors.password && (
                <span
                  style={{
                    color: "red",
                    position: "absolute",
                    top: "550px",
                    fontSize: "12px",
                  }}
                >
                  {errors.password.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary rounded-2xl"
              disabled={errors.email || errors.role || errors.password}
            >
              Create User
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
