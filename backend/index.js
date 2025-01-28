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

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`server runnning on PORT ${process.env.PORT}`);
});
