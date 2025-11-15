import { useEffect, useState } from "react";
import { getMessages, sendMessage } from "./services/messageService";
import UserComponents from "./components/UserComponents";

export default function ChatPage({ currentUser, onSelectUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMessage = { sender: currentUser, text };
    try {
      const saved = await sendMessage(newMessage);
      setMessages(prev => [...prev, saved]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-1 h-full flex-col sm:flex-row">
      {/* Sidebar */}
      <div className="w-full sm:w-1/4 bg-indigo-50 p-2 sm:p-4 overflow-y-auto rounded-t-2xl sm:rounded-l-2xl shadow-inner">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-indigo-800">👥 Users</h2>
        <UserComponents onSelectUser={onSelectUser} />
      </div>

      {/* Glavni chat */}
      <div className="flex-1 flex flex-col p-2 sm:p-4 bg-purple-50 rounded-b-2xl sm:rounded-r-2xl mt-2 sm:mt-0">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-2 sm:mb-4 text-purple-700">💬 Global Chat</h1>
        <div className="flex-1 overflow-y-auto mb-2 sm:mb-4 p-2 sm:p-3 bg-white rounded-2xl shadow-inner">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center">Nema poruka još 😄</p>
          ) : (
            messages.map(msg => (
              <div
                key={msg.id || msg.timestamp}
                className={`mb-2 p-2 max-w-[70%] rounded-xl shadow ${
                  msg.sender === currentUser ? "bg-blue-200 self-end" : "bg-gray-200 self-start"
                }`}
              >
                <strong className="text-blue-800">{msg.sender}:</strong> <span>{msg.text}</span>
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
            className="flex-1 border rounded-full p-2 sm:p-3 text-sm sm:text-base outline-none shadow-md"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 sm:px-6 py-2 shadow-md text-sm sm:text-base"
          >
            Pošalji
          </button>
        </form>
      </div>
    </div>
  );
}
