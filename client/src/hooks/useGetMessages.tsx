import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { getSocket } from "../lib/Socket";

const getMessages = async (chatId: string) => {
  const PORT = import.meta.env.VITE_BASE_URL;
  const token = JSON.parse(localStorage.getItem("userCredentials") || "{}");

  const res = await axios.get(`${PORT}/message/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res, "messages");

  return res.data;
};
const useGetMessages = (chatId: string | null, otherUser: string | null) => {
  const queryClient = useQueryClient();
  const { data, isError, isFetched, isLoading } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => getMessages(chatId!),
    enabled: !!chatId,
  });

  useEffect(() => {
    const socket = getSocket();
    console.log(socket, "socket");
    if (!chatId) return;

    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      //optimisation for if it is sender and selected user are same, so chat wont go some other elses chatdata;
      console.log("senderid", newMessage.sender._id);
      if (otherUser !== newMessage.sender._id) return;
      queryClient.setQueryData(["messages", chatId], (oldData: any) => {
        if (!oldData) return { messages: [newMessage] };

        return {
          ...(oldData || { messages: [] }),
          messages: [...(oldData.messages || []), newMessage],
        };
      });
    });

    return () => {
      socket.off("newMessage");
    };
  });

  useEffect(() => {
    const socket = getSocket();
    console.log(socket, "socket");
    if (!chatId) return;

    if (!socket) return;

    socket.on("groupMessage", (newMessage) => {
      //optimisation

      console.log("new Group Chat received", newMessage);
      if (chatId !== newMessage.chat) return;
      queryClient.setQueryData(["messages", chatId], (oldData: any) => {
        if (!oldData) return { messages: [newMessage] };

        return {
          ...oldData,
          messages: [...oldData.messages, newMessage],
        };
      });
    });

    return () => {
      socket.off("groupMessage");
    };
  });
  return {
    data,
    isError,
    isFetched,
    isLoading,
  };
};

export default useGetMessages;
