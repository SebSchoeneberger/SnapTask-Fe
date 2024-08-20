import { useState, useEffect } from "react";
import axios from "axios";
import CreateUser from "../Components/CreateUser";

const API_URL = import.meta.env.VITE_API_URL;
const borderMarkup = "border-[2px] border-base-content p-3 my-4";

export default function Users() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmJmNzAwOWI2MGE0NjY4ZDdlMjNiM2EiLCJlbWFpbCI6ImpvaG5AZG9lLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyNDA3NjU5NCwiZXhwIjoxNzI0MTYyOTk0fQ.uXZHrFkU7YKlXSLFGqLMYSKJ208oAOC2lGady83mllE";
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const usersUrl = `${API_URL}/users/all`;

  useEffect(() => {
    axios
      .get(usersUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        toast.error("Error loading users");
      });
  }, []);

  return (
    <div className="flex flex-col gap-6 mt-10 p-5">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">User Management</p>
        <button className="btn" onClick={() => setModalOpen(true)}>
          Create User
        </button>
      </div>
      <table className="table-fixed border-[1px] border-base-content w-full text-sm mb-16">
        <thead className={borderMarkup}>
          <tr>
            <th className={borderMarkup}>Name</th>
            <th className={borderMarkup}>Email Address</th>
            <th className={borderMarkup}>Created by</th>
            <th className={borderMarkup}>Created at</th>
            <th className={borderMarkup}>Account Type</th>
          </tr>
        </thead>
        <tbody>
          <tr key={users._id}>
            <td className={borderMarkup}>
              {users.firstName} {users.lastName}
            </td>
            <td className={borderMarkup}>{users.email}</td>
            <td className={borderMarkup}>{users.creator}</td>
            <td className={borderMarkup}>{users.createdAt}</td>
            <td className={borderMarkup}>{users.role}</td>
          </tr>
        </tbody>
      </table>
      {modalOpen && <CreateUser closeModal={() => setModalOpen(false)} />}
    </div>
  );
}
