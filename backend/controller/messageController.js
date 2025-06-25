const Message = require("../model/messageModel");
const User = require("../model/userModel");
const Chat = require("../model/chatModel");
const { fetchChats } = require("./chatController");
const { getReceiverSocketId } = require("../lib/socket");
const { io } = require("../lib/socket");

const getAllChats = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender")
      .populate("chat");

    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "internal server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { content, chatId, receiver } = req.body;

    if (!content || !chatId) {
      return res
        .status(404)
        .json({ message: "Invalid data passed into request" });
    }

    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    const newData = {
      sender: { _id: req.user._id },
      content,
      updatedAt: new Date(),
      chat: {
        _id: chatId,
        users: [req.user._id, receiver],
      },
    };

    var message = await Message.create(newMessage);

    const receiverSocketId = getReceiverSocketId(receiver);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newData);
    }

    // use of execPopulate because we are populating instace of mongoose class
    message = await message.populate("sender", "user picture"); //populating sender with userand picture
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.user",
      select: "userName email picture",
    });

    //updating latest message.
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessages: message,
    });

    res.json(message);
  } catch (error) {
    res.status(501).json({ message: "internal server error" });
  }
};

const sendGroupChatMessage = async (req, res) => {
  console.log("group chat triggered");
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      return res
        .status(404)
        .json({ message: "Invalid data passed into request" });
    }

    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    const chat = await Chat.findOne({ _id: chatId });
    const sender = await User.findOne({ _id: req.user._id });

    const newData = {
      sender,
      content,
      updatedAt: new Date(),
      chat: chatId,
      users: chat.users,
    };

    var message = await Message.create(newMessage);

    const receiversSocketIds = chat.users
      .filter((id) => id.toString() !== req.user._id.toString()) //to exclude sender
      .map((id) => getReceiverSocketId(id)) // get socket IDs
      .filter(Boolean); //to remove undefines;

    if (receiversSocketIds) {
      receiversSocketIds.forEach((id) => {
        io.to(id).emit("groupMessage", newData);
      });
    }

    // use of execPopulate because we are populating instace of mongoose class
    message = await message.populate("sender", "user picture"); //populating sender with userand picture
    message = await message.populate("chat");
    // message = await User.populate(message, {
    //   path: "chat.users",
    //   select: "userName email picture",
    // });
    message = await message.populate("chat.latestMessages");

    //updating latest message.
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessages: message,
    });

    res.json(message);
  } catch (error) {
    res.status(501).json({ message: "internal server error" });
  }
};
const fetchMessage = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId).populate("users");
    if (!chat) {
      return res.status(404).json({
        message: "NO chat found",
      });
    }
    const messages = await Message.find({ chat: req.params.chatId }).populate(
      "sender"
    );

    return res.status(200).json({
      chat,
      messages: messages || [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllChats,
  sendMessage,
  fetchMessage,
  sendGroupChatMessage,
};
