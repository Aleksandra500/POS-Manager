import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

function PrivateChat({ currentUser, targetUser, onClose }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const roomId = [currentUser, targetUser].sort().join("-");

  useEffect(() => {
    socket = io(import.meta.env.VITE_API_URL); // ili http://localhost:3000
    socket.emit("joinRoom", { currentUser, targetUser });

    socket.on("receivePrivateMessage", (msg) => {
      if (msg.roomId === roomId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    // cleanup
    return () => {
      socket.disconnect();
    };
  }, [currentUser, targetUser]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const message = { currentUser, targetUser, text };
    socket.emit("sendPrivateMessage", message);
    setMessages((prev) => [
      ...prev,
      { sender: currentUser, text, timestamp: Date.now(), roomId },
    ]);
    setText("");
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">💬 Private Chat with {targetUser}</h2>
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded"
        >
          Back
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 p-3 bg-white rounded-xl shadow">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">Nema poruka još 😄</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <strong>{msg.sender}:</strong> <span>{msg.text}</span>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Unesi poruku..."
          className="flex-1 border rounded-xl p-2 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4"
        >
          Pošalji
        </button>
      </form>
    </div>
  );
}

export default PrivateChat;
