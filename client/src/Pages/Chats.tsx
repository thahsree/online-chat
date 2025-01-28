import { motion } from "framer-motion";
import { useState } from "react";

const Chats = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className="relative w-full h-full">
      <div className="flex bg-[#2c2a2a] w-full h-[70px] items-center justify-between px-5">
        <div>Search</div>
        <h3 className="text-4xl font-light font-mono text-white text-center">
          CHIT CHAT
        </h3>
        <div>Profile</div>
      </div>
      <div
        className="bg-[#2c2a2a6d] flex w-full"
        style={{ height: "calc(100vh - 70px)" }}
      >
        {/* Navbar */}

        <div className="w-[35%] flex items-center flex-col px-5">
          {/* heading */}
          <div className="flex justify-between w-full py-4 items-center">
            <div>My Chats</div>
            <div
              onClick={() => setShowModal((prev) => !prev)}
              className="p-1 bg-white text-black border rounded border-transparent"
            >
              New Group Chat
            </div>
          </div>
          <ul className="w-full flex flex-col gap-2 mt-3">
            <li className="bg-[#342e2e] py-2 rounded px-2">Group 1</li>
            <li className="bg-[#342e2e] py-2 rounded px-2">Jane Doe</li>
            <li className="bg-[#342e2e] py-2 rounded px-2">John Doe</li>
          </ul>
        </div>

        <div className="w-full bg-[#342e2e7b] flex flex-col justify-end py-2 px-5">
          <input
            className="w-full h-[20px] border border-transparent rounded px-2 py-6 flex items-center bg-[#484343b5]"
            placeholder="type your message"
          />
        </div>
      </div>

      {showModal && (
        <motion.div
          initial={{ opacity: 0, y: -500, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-white w-[500px] h-[500px] flex absolute top-[20%] left-[30%] flex-col"
        >
          <div className="relative w-full py-5 px-3 text-black">
            <h3>CREATE GROUP CHAT</h3>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-[10px] right-[20px]"
            >
              X
            </button>
          </div>
          <div className="flex">
            <ul className="flex flex-wrap items-center justify-center text-black">
              <li>USER1</li>
              <li>USER2</li>
              <li>USER3</li>
              <li>USER4</li>
            </ul>
          </div>
          <div></div>
        </motion.div>
      )}
    </div>
  );
};

export default Chats;
