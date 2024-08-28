import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { UpdateUserModal } from "../Components/Users/EditUsers";
import { CreateUser } from "../Components/Users/CreateUser";
import { getToken } from "../Utils/TokenUtils";
import LoadingSpinner from "../Components/LoadingSpinner";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);

  const token = getToken();

  const dropdownRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data.staff);
      })
      .catch((error) => {
        toast.error("Error loading users");
        console.log(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const openModalFunction = (name) => {
    document.getElementById(name).showModal();
  };

  const handleEdit = (user) => {
    setEditUser(user);
    // document.getElementById("update_user_modal").showModal();
    setEditModal(true);
  };

  const handleDelete = (user) => {
    console.log(user);
    setDeleteUser(user);
    document.getElementById("delete_user_modal").showModal();
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

  if (loading)
    return (
      <div className="min-h-screen border-[2px] border-base-content w-full text-left px-12">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-6 mt-10 p-5 min-h-screen w-full">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">User Management</p>
        <button
          className="btn btn-primary"
          onClick={() => openModalFunction("people")}
        >
          Create User
        </button>
      </div>
      {users.length > 0 ? (
        <div className="">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email Address</th>
                <th>Created by</th>
                <th>Created at</th>
                <th>Account Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover">
                  <th>{index + 1}</th>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.creator.firstName} {user.creator.lastName}
                  </td>
                  <td>{user.createdAt}</td>
                  <td>{user.role}</td>
                  <td ref={dropdownRef}>
                    <details className="dropdown dropdown-end">
                      <summary className="btn m-0 p-0 border-none bg-transparent hover:bg-transparent">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
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
                          <button onClick={() => handleDelete(user)}>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found.</p>
      )}

      <CreateUser setUsers={setUsers} name="people" />

      {/* Delete User Modal */}
      <dialog
        id="delete_user_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <button
            type="button"
            onClick={() => document.getElementById("delete_user_modal").close()}
            className="btn btn-square absolute top-4 right-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
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
        <UpdateUserModal
          userData={editUser}
          setUsers={setUsers}
          editModal={editModal}
          setEditModal={setEditModal}
        />
      )}
      {/* <UpdateUserModal setUsers={setUsers} name="people" /> */}
    </div>
  );
}
