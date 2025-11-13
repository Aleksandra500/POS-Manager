import { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import ChatPage from '../Chat';
import PrivateChat from './PrivateChat';

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [privateRoom, setPrivateRoom] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("chatUser");
    setUser(savedUser || null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("chatUser"); 
    setUser(null);
    setPrivateRoom(null);
  };

  if (!user) {
    return <LoginPage onLogin={(username) => setUser(username)} />;
  }

  if (privateRoom) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setPrivateRoom(null)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full shadow-md"
          >
            ← Back
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md"
          >
            Logout
          </button>
        </div>
        <div className="flex-1">
          <PrivateChat
            currentUser={user}
            targetUser={privateRoom.targetUser}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-1 overflow-hidden rounded-2xl shadow-xl bg-white">
        <ChatPage
          currentUser={user}
          onSelectUser={(targetUser) => setPrivateRoom({ targetUser })}
        />
      </div>
    </div>
  );
}
