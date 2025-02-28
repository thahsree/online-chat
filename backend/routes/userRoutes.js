const express = require("express");
const { login, register, getUsers } = require("../controller/userController");
const { verifyToken } = require("../middlewares/verifyJWT");

const router = express.Router();


router.get("/", verifyToken, getUsers);
router.post("/login", login);

router.post("/register", register);

module.exports = router;
