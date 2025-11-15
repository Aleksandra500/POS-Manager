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
            className="w-full bg-white hover:bg-indigo-100 text-indigo-800 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md text-left text-sm sm:text-base transition-all duration-200"
          >
            {user.username}
          </button>
        ))}
    </div>
  );
}
