const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/mongo");
const cors = require("cors");
const { app, server } = require("./lib/socket");

dotenv.config();
app.use(express.json());
// app.use(cookieParser());

connectDB();
app.use(cors());

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/chats", require("./routes/chatRoute"));
app.use("/api/message", require("./routes/messageRoute"));

const PORT = process.env.PORT || 5555;
server.listen(PORT, () => {
  console.log(`server runnning on PORT ${process.env.PORT}`);
});
