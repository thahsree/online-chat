const express = require("express");
const { login, register, getUsers } = require("../controller/userController");
const { verifyToken } = require("../middlewares/verifyJWT");
const upload = require("../config/upload");

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.post("/login", login);

router.post("/register", upload.single("image"), register);

module.exports = router;
