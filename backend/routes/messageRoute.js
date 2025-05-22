const express = require("express");
const { verifyToken } = require("../middlewares/verifyJWT");
const {
  sendMessage,
  fetchMessage,
} = require("../controller/messageController");

const router = express.Router();

router.get("/:chatId", verifyToken, fetchMessage);

router.post("/", verifyToken, sendMessage);

module.exports = router;
