import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import GroupChatUI from "./GroupChatUI";
import { SenderUI } from "./SenderUI";

import GroupChatNavBar from "./GroupChatNavBar";

interface Props {
  currentChat: string;
  otherUser: string;
}

const Chatpage = ({ currentChat, otherUser }: Props) => {
  const queryClient = useQueryClient();
  const [chatData, setChatData] = useState<any>(
    queryClient.getQueryData(["messages", currentChat]) || null
  );

  const user = JSON.parse(localStorage.getItem("loggedUser") || "{}");

  const [message, setMessage] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async (e: any) => {
    if (e.key == "Enter" || e.keycode == 13 || e.type == "click") {
      e.preventDefault();

      if (!message.trim()) {
        return;
      }

      const PORT = import.meta.env.VITE_BASE_URL;
      const storedUser = localStorage.getItem("userCredentials");

      const token = storedUser ? JSON.parse(storedUser) : null;

      const res = await axios.post(
        `${PORT}/message`,
        {
          content: message,
          chatId: currentChat,
          receiver: otherUser,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res) {
        alert("failed to send");
      } else {
        const newData = {
          sender: { _id: user._id },
          content: message,
          updatedAt: new Date(),
          chat: {
            _id: currentChat,
            users: [user._id, otherUser],
          },
        };
        setChatData({
          ...chatData,
          messages: [...chatData.messages, newData],
        });

        queryClient.setQueryData(["messages", currentChat], (oldData: any) => ({
          ...oldData,
          messages: [...oldData.messages, newData],
        }));

        console.log(newData);

        setMessage("");
      }
    }
  };

  useEffect(() => {
    if (!currentChat) return;

    const cachedData = queryClient.getQueryData(["messages", currentChat]);
    setChatData(cachedData); // Ensure state updates with latest cache

    const unsubscribe = queryClient.getQueryCache().subscribe(() => {
      setChatData(queryClient.getQueryData(["messages", currentChat]));
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [currentChat, queryClient]);

  // widow scroll down
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView();
    }
  }, [chatData?.messages]);
  if (!chatData) {
    return (
      <div className="w-full bg-[#2c2a2a] flex flex-col justify-center items-center py-2 px-5">
        No Data Found
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {chatData?.chatName !== "sender" && (
        <GroupChatNavBar cachedData={chatData} />
      )}
      <div className="w-full h-full bg-[#2c2a2a] flex flex-col justify-end py-2 px-5 overflow-hidden">
        <div className="overflow-auto">
          {chatData?.chatName === "sender" ? (
            <SenderUI cachedData={chatData} />
          ) : chatData?.chatName.length > 1 ? (
            <GroupChatUI cachedData={chatData} />
          ) : (
            <p>Loading...</p>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className=" bg-[#484343b5] relative">
          <input
            className="w-full h-[20px] border border-transparent rounded px-2 py-6 flex items-center"
            placeholder="type your message"
            onKeyDown={handleSendMessage}
            onChange={(e: any) => setMessage(e.target.value)}
            value={message}
          />
          <button
            className="absolute top-[25%] right-3 border-none outline-none"
            onClick={handleSendMessage}
          >
            <img src="/arrow.svg" alt="arrow" width={25} height={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
