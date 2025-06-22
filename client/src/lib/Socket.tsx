// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

const PORT = import.meta.env.VITE_SOCKET_URL;

export const createSocket = (userId: string): Socket => {
  const socket: Socket = io(PORT, {
    withCredentials: true,
    autoConnect: false,
    transports: ["websocket"],
    query: {
      userId,
    },
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket connect error:", err.message);
  });

  return socket;
};
