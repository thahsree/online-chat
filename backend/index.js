const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/mongo");

const app = express();

app.use(express.json());

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.use("/api/user", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`server runnning on PORT ${process.env.PORT}`);
});
