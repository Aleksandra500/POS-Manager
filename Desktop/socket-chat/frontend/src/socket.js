import { io } from "socket.io-client";


const BACKEND_URL =
  import.meta.env.VITE_API_URL || "https://aleksandra-socket.alwaysdata.net";

const socket = io(BACKEND_URL, {
  transports: ["websocket"], 
  withCredentials: true,      
});

export default socket;
