const express = require("express");
const { verifyToken } = require("../middlewares/verifyJWT");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controller/chatController");

const router = express.Router();

router.get("/", verifyToken, fetchChats);
router.post("/", verifyToken, accessChat);
router.post("/group", verifyToken, createGroupChat);
router.put("/groupRename", verifyToken, renameGroup);
router.put("/addToGroup", verifyToken, addToGroup);
router.put("/removeFromGroup", verifyToken, removeFromGroup);

module.exports = router;
