const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
});

module.exports = { io, app, server };
