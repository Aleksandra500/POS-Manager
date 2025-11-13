import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";

export default function UserComponents({ onSelectUser, currentUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {users
        .filter(user => user.username !== currentUser) // ne prikazuj sebe
        .map(user => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user.username)}
            className="bg-white hover:bg-indigo-100 text-indigo-800 px-4 py-2 rounded-xl shadow-md text-left transition-all duration-200"
          >
            {user.username}
          </button>
        ))}
    </div>
  );
}
