import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import MultiselectComponent from "../MutiselectComponent";
import { getToken } from "../../Utils/TokenUtils";

const API_URL = import.meta.env.VITE_API_URL;

// Create new area Modal
export function CreateAreaModal({ updateAreas }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const token = getToken();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const areaData = {
        ...data,
        creator: user.id,
        users: data.users || [],
      };
      const response = await axios.post(
        `${API_URL}/areas`,
        { ...areaData, users: selectedUsers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Area created successfully!");
      reset();
      document.getElementById("my_modal_5").close();
      updateAreas();
    } catch (error) {
      toast.error(`Error creating area: ${error.response.data.error}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const staff = res.data.staff.filter((user) => user.role === "staff");
        setUsers(staff);
      })
      .catch((error) => {
        toast.error("Error loading areas");
        console.error(error);
      });
  }, []);

  function handleClose(e) {
    e.preventDefault();
    document.getElementById("my_modal_5").close();
    reset();
  }

  return (
    <>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-200 p-6 my-8 rounded-2xl min-w-[700px]">
          <div className="flex justify-between items-center gap-3 pb-4">
            <h3 className="text-2xl font-semibold text-left w-full max-w-xl">Create Area</h3>
            <button type="button" onClick={handleClose} className="">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form method="dialog" className="flex flex-col gap-6 items-center" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="w-full flex flex-col items-start gap-2">
              <span className="label-text">Area Name*</span>
              <label className={`input input-bordered w-full relative flex items-center gap-2 ${errors.name ? "input-error" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                  />
                </svg>
                <input type="text" className="grow" placeholder="" {...register("name", { required: "Area name is required" })} />
              </label>
              {errors.name && (
                <p
                  style={{
                    color: "red",
                    position: "absolute",
                    top: "150px",
                    fontSize: "12px",
                  }}>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-2">
              <span className="label-text">Location</span>
              <label className="w-full input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>

                <input type="text" className="grow" placeholder="" {...register("address")} />
              </label>
            </div>
            <div className="w-full flex flex-col items-start gap-2">
              <span className="label-text">Contact</span>
              <label className="w-full input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokelidth="1.5" stroke="currentColor" className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                  />
                </svg>
                <input type="text" className="grow" placeholder="" {...register("contact")} />
              </label>
            </div>
            <div className="w-full flex flex-col items-start gap-2">
              <span className="label-text">Assign Staff</span>
              {/* <select
                className="w-full select select-bordered max-w-xs"
                defaultValue=""
                {...register("users")}
              >
                <option value="" disabled>
                  <span className="italic">Choose one or more</span>
                </option>
                {users.map((user, index) => {
                  return (
                    <option key={index} value={user._id}>
                      {" "}
                      {user.firstName} {user.lastName}
                    </option>
                  );
                })}
              </select> */}
              <MultiselectComponent
                users={users.filter((user) => user.role === "staff")}
                setSelectedUsers={setSelectedUsers}
                defaultSeleted={null}
                styles={{
                  color: "blue",
                }}
              />
            </div>
            <button className="btn btn-primary rounded-2xl" type="submit" disabled={isLoading}>
              Create Area
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

// Update Area Modal
export function UpdateAreaModal({ areaData, updateAreas, areaUsers }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: areaData || {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const token = getToken();
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (areaData) {
      reset(areaData);
    }
  }, [areaData, reset]);

  useEffect(() => {
    axios
      .get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data.staff);
      })
      .catch((error) => {
        toast.error("Error loading areas");
        console.error(error);
      });
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    // console.log(data);
    try {
      const response = await axios.put(
        `${API_URL}/areas/${areaData._id}`,

        { ...areaData, users: selectedUsers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Area updated successfully");
      document.getElementById("update_area_modal").close();
      updateAreas();
    } catch (error) {
      toast.error(`Error updating area: ${error.message}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id="update_area_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-base-200 p-6 my-8 rounded-2xl min-w-[700px]">
        <div className="flex justify-between items-center gap-3 pb-4">
          <h3 className="text-2xl font-semibold text-left w-full max-w-xl">Edit Area</h3>
          <button type="button" onClick={() => document.getElementById("update_area_modal").close()} className="">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 items-center">
          <div className="w-full flex flex-col items-start gap-2">
            <span className="label-text">Area Name</span>
            <label className="w-full input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                />
              </svg>
              <input type="text" className="grow" placeholder="Area Name" {...register("name", { required: "Area name is required" })} />
            </label>
            {errors.name && (
              <p
                style={{
                  color: "red",
                  position: "absolute",
                  top: "150px",
                  fontSize: "12px",
                }}>
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <span className="label-text">Location</span>
            <label className="w-full input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <input type="text" className="grow" placeholder="Location" {...register("address")} />
            </label>
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <span className="label-text">Contact</span>
            <label className="w-full input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                />
              </svg>
              <input type="text" className="grow" placeholder="Contact Info" {...register("contact")} />
            </label>
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <span className="label-text">Assign Staff</span>
            {/* <select
              className="w-full select select-bordered max-w-xs"
              defaultValue={[]}
              multiple
              {...register("users")}
            >
              <option value="" disabled>
                <span className="italic">Choose one or more</span>
              </option>
              {users.map((user, index) => {
                return (
                  <option key={index} value={user._id}>
                    {" "}
                    {user.firstName} {user.lastName}
                  </option>
                );
              })}
            </select> */}
            <MultiselectComponent
              users={users.filter((user) => user.role === "staff")}
              setSelectedUsers={setSelectedUsers}
              defaultSeleted={areaUsers}
            />
          </div>

          <button className="btn btn-primary rounded-2xl" type="submit" disabled={isLoading}>
            Update Area
          </button>
        </form>
      </div>
    </dialog>
  );
}
