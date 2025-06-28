const Chat = require("../model/chatModel");
const User = require("../model/userModel");

const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      console.log("no user id params");
      return res.status(400).json({ message: "userId params not found" });
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessages");

    isChat = await User.populate(isChat, {
      path: "latestMessages.sender",
      select: "userName picture email",
    });

    if (isChat.length > 0) {
      res.status(200).send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      try {
        const createdChat = await Chat.create(chatData);

        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );

        res.status(200).send(fullChat);
      } catch (error) {
        console.log(error);
        res.status(400);
        throw new Error(error.message);
      }
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "internal server error" });
  }
};

const fetchChats = async (req, res) => {
  try {
    var result = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessages")
      .sort({ updatedAt: -1 });

    result = await User.populate(result, {
      path: "latestMessages.sender",
      select: "userName picture email",
    });

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const createGroupChat = async (req, res) => {
  try {
    console.log(req.user, "USER REQ");
    console.log(req.body);
    if (!req.body.users || !req.body.name) {
      return res.status(404).json({ message: "please add required fields" });
    }

    const users = req.body.users;

    if (users.length < 2) {
      return res.status(404).json({ message: "min 2 users required" });
    }

    users.push(req.user);

    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).send(fullGroupChat);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const renameGroup = async (req, res) => {
  try {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(404).json({ message: "chat not found" });
    } else {
      res.status(200).send(updatedChat);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const addToGroup = async (req, res) => {
  try {
    const { userId, chatId } = req.body;
    const isUserInGroup = await Chat.findById(chatId, {
      users: { $elemMatch: { $eq: { _id: userId } } },
    });

    if (isUserInGroup.users.length > 0) {
      return res.status(409).json({ message: "user alredy exist in group" });
    }
    const updatedChatMembers = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChatMembers) {
      return res.status(404).json({ message: "chat not found" });
    } else {
      res.status(200).send(updatedChatMembers);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const removeFromGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const updatedChatMembers = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChatMembers) {
      res.status(404).json({ message: "chat or user not found" });
    } else {
      res.status(200).send(updatedChatMembers);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};
module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
