const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/mongo");
const cors = require("cors");
const app = express();

app.use(express.json());

dotenv.config();

connectDB();
app.use(cors());

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/chats", require("./routes/chatRoute"));
app.use("/api/message", require("./routes/messageRoute"));

const PORT = process.env.PORT || 5555;
const server = app.listen(PORT, () => {
  console.log(`server runnning on PORT ${process.env.PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 6000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData);
    socket.emit("connected");
  });

  socket.on("new message", (newMessage) => {
    const chat = newMessage.chat;
    console.log("from chat", newMessage.sender);
    if (!chat) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      console.log(user, "user");
      console.log(newMessage.sender, "sender");
      if (user !== newMessage.sender) {
        socket.to(user).emit("message received", newMessage);
        console.log(`message sended to user ${user}`);
      }
    });
  });
});
