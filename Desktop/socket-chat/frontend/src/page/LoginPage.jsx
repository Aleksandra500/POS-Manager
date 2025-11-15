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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-sm sm:max-w-md">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Welcome 👋</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
