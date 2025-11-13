import { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import ChatPage from '../Chat';
import PrivateChat from './PrivateChat';

export default function HomePage() {
  const [user, setUser] = useState(null);          // trenutni korisnik
  const [privateRoom, setPrivateRoom] = useState(null); // ako je otvoren privatni chat

  // kad se komponenta mountuje, proveri localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("chatUser");
    setUser(savedUser || null);
  }, []);

  // logout
  const handleLogout = () => {
    localStorage.removeItem("chatUser"); 
    setUser(null);
    setPrivateRoom(null);
  };

  // Ako nije ulogovan, pokaži login
  if (!user) {
    return <LoginPage onLogin={(username) => setUser(username)} />;
  }

  // Ako je otvoren privatni chat
  if (privateRoom) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => setPrivateRoom(null)}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            ← Back
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
        <PrivateChat
          currentUser={user}
          targetUser={privateRoom.targetUser}
        />
      </div>
    );
  }

  // Inače, prikaži global chat
  return (
    <div className="p-4">
      <div className="flex justify-end mb-2">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
      <ChatPage
        currentUser={user}
        onSelectUser={(targetUser) => setPrivateRoom({ targetUser })}
      />
    </div>
  );
}
