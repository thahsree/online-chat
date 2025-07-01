const generateToken = require("../config/generateToken");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const upload = require("../config/upload");

const login = async (req, res) => {
  try {
    const { email, password: reqPassword } = req.body;
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res
        .status(404)
        .json({ message: "Email not found. Please signup first" });
    }

    const match = await bcrypt.compare(reqPassword, foundUser.password);

    if (!match) {
      return res.status(401).json({ message: "password incorrect" });
    }

    const { password, ...userData } = foundUser;

    return res.status(200).json({
      message: "user logged in",
      userData,
      token: generateToken(foundUser._id),
    });
  } catch (error) {}
};

const register = async (req, res) => {
  const { username, email, password, image } = req.body;
  try {
    const duplicateUser = await User.findOne({ email });

    if (duplicateUser) {
      return res.status(405).json({ message: "email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const imageurl = req.file ? req.file.path : "";
    console.log("image", imageurl);

    const newUser = {
      password: hashedPass,
      userName: username,
      email,
      image: imageurl,
    };

    const user = await User.create(newUser);

    return res.status(201).json({ message: "user created", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getUsers = async (req, res) => {
  console.log("reached");
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: `^${req.query.search}`, $options: "i" } },
            { email: { $regex: `^${req.query.search}`, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    console.log(users);
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { login, register, getUsers };
