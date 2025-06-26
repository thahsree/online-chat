import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Chatpage from "../components/Chatpage";
import GroupChatModal from "../components/GroupChatModal";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import UsersListSideBar from "../components/UsersListSideBar";
import { useAuth } from "../hooks/useAuth";
import { initSocket } from "../lib/Socket";

const Chats = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [currentChat, setCurrentChat] = useState<string>("");
  const [otherUser, setOtherUser] = useState<string>("");
  const [isGroupChat, setIsGroupChat] = useState<boolean>(false);
  const { user, initiateOnlineUsers } = useAuth();
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  let socket: Socket | null = null;
  console.log(isGroupChat, "isGroupChat");

  useEffect(() => {
    if (user && (!socket || !socket.connected)) {
      console.log(user._id, "userID");
      socket = initSocket(user._id);
      socket.connect();

      socket.on("getOnlineUsers", (userIds: string[]) => {
        initiateOnlineUsers(userIds);
        console.log("ONLINE USERS", userIds);
      });
    }
  }, [user]);

  return (
    <div className="relative w-full h-full">
      <Navbar setShowProfile={setShowProfile} setShowSideBar={setShowSideBar} />
      {showProfile && <Profile />}
      <div
        style={{ height: "calc(100vh - 70px)" }}
        className="flex w-full max-sm:h-full max-sm:relative"
      >
        <UsersListSideBar
          setShowModal={setShowModal}
          setCurrentChat={setCurrentChat}
          setOtherUser={setOtherUser}
          setIsGroupChat={setIsGroupChat}
          showSideBar={showSideBar}
        />

        <Chatpage
          currentChat={currentChat}
          otherUser={otherUser}
          isGroupChat={isGroupChat}
        />
      </div>

      {showModal && (
        <motion.div
          initial={{ opacity: 0, y: -500, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-white w-[500px] h-[500px] flex absolute top-[20%] left-[30%] flex-col"
        >
          {showModal && <GroupChatModal setShowModal={setShowModal} />}
        </motion.div>
      )}
    </div>
  );
};

export default Chats;
