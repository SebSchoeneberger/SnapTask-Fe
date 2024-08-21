import { useState, useEffect } from "react";
import axios from "axios";
import CreateUser from "../Components/CreateUser";
import { getToken } from "../Utils/TokenUtils";
import LoadingSpinner from "../Components/LoadingSpinner";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;
const borderMarkup = "border-[2px] border-base-content p-3 my-4";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const usersUrl = `${API_URL}/users`;
  const token = getToken();

  useEffect(() => {
    console.log(token);
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
        console.log(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  console.log(users);

  if (loading)
    return (
      <div className="min-h-screen border-[2px] border-base-content w-full text-left px-12">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-6 mt-10 p-5">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">User Management</p>
        <button className="btn" onClick={() => setModalOpen(true)}>
          Create User
        </button>
      </div>
      {users.length > 0 ? (
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
            {users.map((user) => (
              <tr key={user._id}>
                <td className={borderMarkup}>
                  {user.firstName} {user.lastName}
                </td>
                <td className={borderMarkup}>{user.email}</td>
                <td className={borderMarkup}>{user.creator}</td>
                <td className={borderMarkup}>{user.createdAt}</td>
                <td className={borderMarkup}>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
      {modalOpen && (
        <CreateUser
          closeModal={() => setModalOpen(false)}
          setUsers={setUsers}
        />
      )}
    </div>
  );
}
