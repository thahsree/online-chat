import { io, Socket } from "socket.io-client";

const PORT = import.meta.env.VITE_BASE_URL;

// Create the socket instance but don't connect immediately
const socket: Socket = io(PORT, {
     withCredentials: true,
  autoConnect: false, // optional
  transports: ["websocket"],
});

export default socket;