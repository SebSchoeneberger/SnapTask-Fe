import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { UpdateUserModal } from "../Components/Users/EditUsers";
import { CreateUser } from "../Components/Users/CreateUser";
import { getToken } from "../Utils/TokenUtils";
import LoadingSpinner from "../Components/LoadingSpinner";
import { toast } from "react-toastify";
import { formatDateFull, formatDateShort } from "../Utils/DateUtils";
import Pagination from "../Components/Dashboard/Pagination";
import defaultAvatar from "../assets/defaultAvatar.svg";
import DefaultProfileImage from "../Components/DefaultProfileImage";
import sortTables from "../Utils/SortTablesUtils";

const API_URL = import.meta.env.VITE_API_URL;

export default function Users() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const [sortOrder, setSortOrder] = useState("asc");

  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);

  const token = getToken();

  const dropdownRef = useRef(null);

  const fetchUsers = () => {
    axios
      .get(`${API_URL}/users?page=${page}&perPage=${perPage}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data.staff);
        setTotalPages(response.data.totalPages);
        setTotalResults(response.data.totalResults);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        toast.error("Error loading users");
        console.log(error.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, [page, perPage]);

  const openModalFunction = (name) => {
    document.getElementById(name).showModal();
  };

  const handleEdit = (user) => {
    setEditUser(user);
    // document.getElementById("update_user_modal").showModal();
    setEditModal(true);
  };

  const handleDelete = (user) => {
    // console.log(user);
    setDeleteUser(user);
    document.getElementById("delete_user_modal").showModal();
  };

  const updateUsers = () => {
    fetchUsers();
  };

  const deleteUserHandler = () => {
    if (!deleteUser) return;

    axios
      .delete(`${API_URL}/users/${deleteUser._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUsers(users.filter((user) => user._id !== deleteUser._id));
        toast.success("User deleted successfully");
      })
      .catch(() => {
        toast.error("Error deleting user");
      })
      .finally(() => {
        setDeleteUser(null);
        document.getElementById("delete_user_modal").close();
      });
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
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    const sortedAreas = sortTables(users, key, newSortOrder);
    setUsers(sortedAreas);
  };

  if (loading)
    return (
      <div className="min-h-screen w-full text-left px-12">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-6 mt-10 p-5 min-h-screen w-full">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">User Management</p>
        <button className="btn btn-primary rounded-2xl" onClick={() => openModalFunction("people")}>
          Create User
        </button>
      </div>
      {users.length > 0 ? (
        <div className="">
          <table className="table rounded-md  table-zebra table-sm w-full shadow-md">
            <thead className="text-sm bg-base-300 rounded-md ">
              <tr className="border-solid rounded-md ">
                <th></th>
                <th>
                  <div className="flex gap-1 items-center">
                    <span>Name</span>
                    <button className="hover:cursor-pointer" onClick={() => handleSortClick("firstName")}>
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
                    <span>Email Adress</span>
                    <button className="hover:cursor-pointer" onClick={() => handleSortClick("email")}>
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
                    <span>Created by</span>
                    <button className="hover:cursor-pointer" onClick={() => handleSortClick("creator.firstName")}>
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
                    <span>Phone</span>
                    <button className="hover:cursor-pointer" onClick={() => handleSortClick("phone")}>
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
                    <span>Account type</span>
                    <button className="hover:cursor-pointer" onClick={() => handleSortClick("role")}>
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
              {users.map((user, index) => (
                <tr key={user._id} className="hover">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-2">
                      {user.profileImage ? (
                        <img className="w-12 h-12 rounded-full" src={user.profileImage} alt="profile image" />
                      ) : (
                        <div className="w-12 h-12">
                          <DefaultProfileImage />
                        </div>
                      )}
                      {user.firstName} {user.lastName}
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.creator.firstName} {user.creator.lastName}
                  </td>
                  <td>{user.phone}</td>
                  {/* Uppercasing the first letter of the role */}
                  <td>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                  <td ref={dropdownRef}>
                    <details className="dropdown dropdown-end">
                      <summary className="btn m-0 p-0 border-none bg-transparent hover:bg-transparent">
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
                      <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li>
                          <button onClick={() => handleEdit(user)}>Edit</button>
                        </li>
                        <li className="text-red-600">
                          <button onClick={() => handleDelete(user)}>Delete</button>
                        </li>
                      </ul>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination page={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage} totalPages={totalPages} totalResults={totalResults} />
        </div>
      ) : (
        <p>No users found.</p>
      )}

      <CreateUser updateUsers={updateUsers} setUsers={setUsers} name="people" />

      {/* Delete User Modal */}
      <dialog id="delete_user_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <button
            type="button"
            onClick={() => document.getElementById("delete_user_modal").close()}
            className="btn btn-square absolute top-4 right-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="font-bold text-lg">Delete User</h3>
          <p>Are you sure you want to delete this user?</p>
          <div className="modal-action flex justify-center">
            <button className="btn btn-error" onClick={deleteUserHandler}>
              Delete
            </button>
          </div>
        </div>
      </dialog>

      {/* Update User Modal */}

      {editUser && (
        <UpdateUserModal updateUsers={updateUsers} userData={editUser} setUsers={setUsers} editModal={editModal} setEditModal={setEditModal} />
      )}

      {/* <UpdateUserModal setUsers={setUsers} name="people" /> */}
    </div>
  );
}
