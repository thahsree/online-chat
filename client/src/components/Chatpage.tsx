import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import useGetMessages from "../hooks/useGetMessages";
import GroupChatNavBar from "./GroupChatNavBar";
import GroupChatUI from "./GroupChatUI";
import { SenderUI } from "./SenderUI";

interface Props {
  currentChat: string;
  otherUser: string;
  isGroupChat: boolean;
}

const Chatpage = ({ currentChat, otherUser, isGroupChat }: Props) => {
  const queryClient = useQueryClient();
  const { data: chatData, isLoading } = useGetMessages(currentChat, otherUser);

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
      const token = JSON.parse(localStorage.getItem("userCredentials") || "{}");
      console.log(token, "TOKEN");

      try {
        let res;
        if (isGroupChat) {
          res = await axios.post(
            `${PORT}/message/groupChat`,
            {
              content: message,
              chatId: currentChat,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          res = await axios.post(
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
        }

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

          queryClient.setQueryData(
            ["messages", currentChat],
            (oldData: any) => ({
              ...(oldData || { messages: [] }),
              messages: [...(oldData.messages || []), newData],
            })
          );

          console.log(newData);

          setMessage("");
        }
      } catch (error) {
        console.log("failed to send message", error);
        alert("failed to send message");
      }
    }
  };

  // widow scroll down
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView();
    }
  }, [chatData?.messages?.length]);
  if (!chatData) {
    return (
      <div className="w-full h-full bg-[#2c2a2a] bg-[url('/pattern.svg')] bg-repeat flex flex-col justify-center items-center py-2 px-5">
        No Data Found
      </div>
    );
  }

  console.log(chatData, "CHAT DATA new");

  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-[#2c2a2a] bg-[url('/pattern.svg')] bg-repeat flex flex-col justify-between">
        <GroupChatNavBar cachedData={chatData.chat} />
        <div className="flex flex-col justify-end overflow-hidden">
          <div className="overflow-auto scrollbar-hide px-2">
            {!isGroupChat ? (
              chatData?.messages?.length ? (
                <SenderUI cachedData={chatData} />
              ) : (
                <p className="text-white text-center py-4">No messages yet.</p>
              )
            ) : chatData?.chat.chatName?.length > 1 ? (
              chatData?.messages?.length ? (
                <GroupChatUI cachedData={chatData} />
              ) : (
                <p className="text-white text-center py-4">
                  No messages in group chat
                </p>
              )
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
              autoFocus
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
    </div>
  );
};

export default Chatpage;
