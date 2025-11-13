import { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";

function UserComponents({ currentUser, onSelectUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.filter(u => u.username !== currentUser)); // ne prikazuj sebe
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [currentUser]);

  return (
    <div className="w-48 bg-white shadow rounded p-2 mr-2 overflow-y-auto">
      <h2 className="font-semibold mb-2">Users</h2>
      {users.map((u) => (
        <div
          key={u.id}
          className="cursor-pointer hover:bg-gray-200 p-1 rounded"
          onClick={() => onSelectUser(u.username)}
        >
          {u.username}
        </div>
      ))}
    </div>
  );
}

export default UserComponents;
