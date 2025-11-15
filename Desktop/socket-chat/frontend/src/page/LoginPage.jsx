import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("Please enter your name");
      return;
    }

    try {
      const data = await loginUser(username);

      if (data.success) {
        localStorage.setItem("chatUser", username);
        onLogin(username);
        navigate("/chat");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong, try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black p-4 text-white">
      <div className="bg-[#0f1724] p-8 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md border border-white/6">
        <h2 className="text-3xl font-semibold text-center mb-6">Welcome 👋</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/6 rounded-full px-4 py-3 outline-none placeholder-white/50 text-white focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-br from-purple-600 to-indigo-500 px-5 py-3 rounded-full shadow-md hover:opacity-90 transition text-white font-medium"
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
