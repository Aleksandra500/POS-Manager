import { io } from "socket.io-client"


const socket = io("https://aleksandra-socket.alwaysdata.net", {
  transports: ["websocket"],
  withCredentials: true,      
});

export default socket;