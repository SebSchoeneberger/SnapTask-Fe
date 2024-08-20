import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateUser({ closeModal }) {
  const url = "http://localhost:3333/users";
  const nav = useNavigate();

  const emptyModal = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  };
  const [newUser, setNewUser] = useState(emptyModal);
  const [error, setError] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setError(false);

    if (
      newUser.firstName == "" ||
      newUser.lastName == "" ||
      newUser.email == "" ||
      newUser.role == "" ||
      newUser.password == ""
    ) {
      setError(true);
    } else {
      console.log(newUser);
      axios
        .post(url, newUser)
        .then((res) => {
          setNewUser(emptyModal);
          nav("/");
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        })
        .finally(() => {});
    }
  }

  function onChange(e) {
    setError(false);

    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  return (
    <div className="min-h-screen max-w-[900px] m-auto absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-base-200 py-2 my-8 rounded-2xl min-w-[700px] m-auto">
        <div className="flex justify-between items-center pt-4">
          <p className="text-2xl font-semibold text-left w-full max-w-xl m-auto">
            Create User
          </p>
          <button className="m-auto" onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form
          onSubmit={onSubmit}
          action="submit"
          className="mt-4 flex flex-col gap-3 pb-4"
        >
          <InputField
            name="firstName"
            label="First Name"
            placeholder=""
            value={newUser.firstName}
            onChange={onChange}
            error={error}
          />
          <InputField
            name="lastName"
            label="Last Name"
            placeholder=""
            value={newUser.lastName}
            onChange={onChange}
            error={error}
          />
          <InputField
            name="email"
            label="Email Address"
            placeholder=""
            value={newUser.email}
            onChange={onChange}
            error={error}
            required={true}
          />
          <InputField
            name="role"
            label="Account Type"
            placeholder=""
            value={newUser.role}
            onChange={onChange}
            error={error}
            required={true}
          />
          <InputField
            name="password"
            label="Password"
            placeholder=""
            value={newUser.password}
            onChange={onChange}
            error={error}
            required={true}
          />
          <button
            type="submit"
            className="btn btn-outline btn-success mt-6 w-full max-w-[10rem] m-auto"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

const InputField = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  error,
  required,
}) => {
  return (
    <label className="form-control w-full max-w-xl m-auto">
      <div className="label pb-0">
        <span className="label-text">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      </div>
      <input
        onChange={onChange}
        value={value}
        name={name}
        type="text"
        placeholder={placeholder}
        className={`input input-bordered w-full mt-2 ${
          error && !value && "input-error"
        }`}
        required={required}
      />
      {error && !value && <p className="text-red-600 mt-2 text-sm">{error}</p>}
    </label>
  );
};
