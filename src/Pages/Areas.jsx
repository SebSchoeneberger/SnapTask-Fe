import React from "react";
import { CreateAreaModal, UpdateAreaModal } from "../Components/Areas/AreaModals";
import { useState, useEffect, useRef } from "react";
import { getToken } from "../Utils/TokenUtils";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "../Components/Dashboard/Pagination";

const API_URL = import.meta.env.VITE_API_URL;

const Areas = () => {
  const [areas, setAreas] = useState([]);
  const [editArea, setEditArea] = useState(null);
  const [deleteArea, setDeleteArea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const token = getToken();
  const dropdownRef = useRef(null);

  const fetchAreas = () => {
    axios
      .get(`${API_URL}/areas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAreas(res.data.areas);
        // console.log(res.data)
      })
      .catch((error) => {
        toast.error("Error loading areas");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const handleEdit = (area) => {
    setEditArea(area);
    document.getElementById("update_area_modal").showModal();
  };

  const handleDelete = (area) => {
    setDeleteArea(area);
    document.getElementById("delete_area_modal").showModal();
  };

  const deleteAreaHandler = () => {
    if (!deleteArea) return;

    axios
      .delete(`${API_URL}/areas/${deleteArea._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAreas(areas.filter((area) => area._id !== deleteArea._id));
        toast.success("Area deleted successfully");
      })
      .catch(() => {
        toast.error("Error deleting area");
      })
      .finally(() => {
        setDeleteArea(null);
        document.getElementById("delete_area_modal").close();
      });
  };

  const updateAreas = () => {
    fetchAreas();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      const openDropdown = document.querySelector("details[open]");
      if (openDropdown) {
        openDropdown.removeAttribute("open");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSortClick = (key) => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    sortAreas(key);
  };

  const sortAreas = (key) => {
    const sortedAreas = [...areas].sort((a, b) => {
      let valueA, valueB;

      if (key === "users") {
        // Sort by the first user's full name in the array
        valueA = a.users.length > 0 ? `${a.users[0].firstName} ${a.users[0].lastName}`.toUpperCase() : "";
        valueB = b.users.length > 0 ? `${b.users[0].firstName} ${b.users[0].lastName}`.toUpperCase() : "";
      } else {
        valueA = a[key] ? a[key].toUpperCase() : "";
        valueB = b[key] ? b[key].toUpperCase() : "";
      }

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    setAreas(sortedAreas);
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-6 mt-10 p-5">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Area Management</p>
        <button className="btn btn-primary" onClick={() => document.getElementById("my_modal_5").showModal()}>
          Create Area
        </button>
      </div>

      <p className="text-xl font-semibold text-left pl-4">Areas</p>

      {loading ? (
        <p>Loading areas...</p>
      ) : (
        <div className="">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>
                  <div className="flex gap-1 items-center">
                    <span>Area Name</span>
                    <button className="hover:cursor-pointer" onClick={() => handleSortClick("name")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th>
                  <div className="flex gap-1 items-center">
                    <span>Location</span>
                    <button className="hover:cursor-pointer" onClick={() => handleSortClick("address")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th>
                  <div className="flex gap-1 items-center">
                    <span>Contact Info</span>
                    <button className="hover:cursor-pointer" onClick={() => handleSortClick("contact")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th>
                  <div className="flex gap-1 items-center">
                    <span>Assigned to</span>
                    <button className="hover:cursor-pointer" onClick={() => handleSortClick("users")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {areas.map((area, index) => (
                <tr key={area._id} className="hover">
                  <th>{index + 1}</th>
                  <td>{area.name}</td>
                  <td>{area.address}</td>
                  <td>{area.contact}</td>
                  <td>
                    {area.users.map((user, userIndex) => (
                      <div key={userIndex}>
                        {user.firstName} {user.lastName}
                      </div>
                    ))}
                  </td>
                  <td ref={dropdownRef}>
                    <details className="dropdown dropdown-end">
                      <summary className="btn m-0 p-0 border-none bg-transparent hover:bg-transparen hover:cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                      </summary>
                      <ul className="menu dropdown-content bg-base-100 rounded-box z-[10] w-28 p-1 shadow">
                        <li>
                          <button onClick={() => handleEdit(area)}>Edit</button>
                        </li>
                        <li className="text-red-600">
                          <button onClick={() => handleDelete(area)}>Delete</button>
                        </li>
                      </ul>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination />
        </div>
      )}

      {/* Delete Area Modal */}
      <dialog id="delete_area_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <button
            type="button"
            onClick={() => document.getElementById("delete_area_modal").close()}
            className="btn btn-square absolute top-4 right-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="font-bold text-lg">Delete Area</h3>
          <p>Are you sure you want to delete this Area?</p>
          <div className="modal-action flex justify-center">
            <button className="btn btn-error" onClick={deleteAreaHandler}>
              Delete
            </button>
          </div>
        </div>
      </dialog>

      <CreateAreaModal updateAreas={updateAreas} />
      <UpdateAreaModal areaData={editArea} updateAreas={updateAreas} />
    </div>
  );
};

export default Areas;
