import { motion } from "framer-motion";
import { useState } from "react";
import Chatpage from "../components/Chatpage";
import GroupChatModal from "../components/GroupChatModal";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import UsersListSideBar from "../components/UsersListSideBar";

const Chats = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [currentChat, setCurrentChat] = useState<string>("");
  const [otherUser, setOtherUser] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div className="relative w-full h-full">
      <Navbar setShowProfile={setShowProfile} />
      {showProfile && <Profile />}
      <div
        style={{ height: "calc(100vh - 70px)" }}
        className="flex w-full max-md:flex-col max-sm:h-full"
      >
        <UsersListSideBar
          setShowModal={setShowModal}
          setCurrentChat={setCurrentChat}
          setOtherUser={setOtherUser}
        />

        <Chatpage currentChat={currentChat} otherUser={otherUser} />
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
