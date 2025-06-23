const express = require("express");
const { verifyToken } = require("../middlewares/verifyJWT");
const {
  sendMessage,
  fetchMessage,
  getAllChats,
  sendGroupChatMessage,
} = require("../controller/messageController");

const router = express.Router();

router.get("/:chatId", verifyToken, fetchMessage);

router.post("/", verifyToken, sendMessage);
router.post("/groupChat", verifyToken, sendGroupChatMessage);

module.exports = router;
