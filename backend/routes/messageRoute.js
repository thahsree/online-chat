const express = require("express");
const { verifyToken } = require("../middlewares/verifyJWT");
const {
  sendMessage,
  fetchMessage,
  getAllChats,
} = require("../controller/messageController");

const router = express.Router();

router.get("/:chatId", verifyToken, getAllChats);

router.post("/", verifyToken, sendMessage);

module.exports = router;
