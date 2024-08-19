import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function Profile() {
  const url = `http://localhost:3333/auth/me`;
  const [loading, setLoading] = useState(true);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmJmNzAwOWI2MGE0NjY4ZDdlMjNiM2EiLCJlbWFpbCI6ImpvaG5AZG9lLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyNDA2NDU2MCwiZXhwIjoxNzI0MTUwOTYwfQ.SXPJLdCKIynH6C8bysnabT1Ynt_s_jnywtcaqj8H1ts";

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.user);
        setUserData(res.data.user);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleChange(e) {
    console.log(e.target.value);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen border-[2px] border-solid border-base-300 max-w-[60rem] m-auto text-left px-12">
      <p className="text-2xl font-bold pt-12">My Settings</p>

      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="flex mt-8 gap-12">
          <div className="w-[40%]">
            <p className="font-bold mt-2">Profile</p>
            <p className="text-xs">Your personal information and account security settings</p>
          </div>
          <div className="w-[60%]">
            {/* <p className="font-bold">Avatar</p> */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">First Name</span>
              </div>
              <input
                value={userData.firstName}
                {...register("firstName")}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">Last Name</span>
              </div>
              <input
                value={userData.lastName}
                {...register("lastName", { required: false })}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div className="flex mt-8 gap-12 items-center">
          <div className="w-[40%]">
            <p className="font-bold">Email address</p>
            <p className="text-xs">Your email is used to login into the platform</p>
          </div>
          <div className="w-[60%]">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">Email</span>
              </div>
              <input
                {...register("email", { required: true })}
                type="email"
                autoComplete="off"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={userData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-error">Email is required.</p>}
            </label>
          </div>
        </div>
        <div className="flex mt-8 gap-12">
          <div className="w-[40%]">
            <p className="font-bold mt-2">Set Password</p>
            <p className="text-xs">Choose a new password</p>
          </div>
          <div className="w-[60%]">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">Current password</span>
              </div>
              <input
                {...register("currentPassword", { required: false })}
                onChange={handleChange}
                type="password"
                autoComplete="off"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">New password</span>
              </div>
              <input
                {...register("newPassword", { required: false })}
                onChange={handleChange}
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold">Re-type new password</span>
              </div>
              <input
                {...register("confirmNewPassword", { required: false })}
                onChange={handleChange}
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
        <div className="flex justify-end my-12">
          <button type="submit" className="btn btn-info px-5">
            Save Settings
          </button>
        </div>
        <div className="border-[2px] border-base-content "></div>
        <p className="font-bold mt-8">Delete account</p>
        <p className="text-xs">You can't re-activate your account again. It wil delete your account permanantly.</p>
        <div className="flex justify-end my-12">
          <button className="btn bg-red-500 text-white">Delete Account</button>
        </div>
      </form>
    </div>
  );
}
