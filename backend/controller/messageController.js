const Message = require("../model/messageModel");
const User = require("../model/userModel");
const Chat = require("../model/chatModel");
const { fetchChats } = require("./chatController");

const getAllChats = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populata("sender")
      .poulate("chat");

    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "internal server error" });
  }
};

const sendMessage = async (req, res) => {
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

    var message = await Message.create(newMessage);

    // use of execPopulate because we are populating instace of mongoose class
    message = await message.populate("sender", "user");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "userName email picture",
    });

    console.log("Reached");

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
    console.log("REACHED  ");
    const chat = await Message.find({ chat: req.params.chatId });

    if (!chat) {
      return res.status(404).json({
        message: "invalid chatID or chatID not provided",
      });
    }
    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messsage: "Internal server error" });
  }
};

module.exports = { getAllChats, sendMessage, fetchMessage };
