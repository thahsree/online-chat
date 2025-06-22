import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PORT = import.meta.env.VITE_BASE_URL;
const token = JSON.parse(localStorage.getItem("userCredentials") || "");

const getMessages = async (chatId: string) => {
  const res = await axios.get(`${PORT}/message/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
const useGetMessages = (chatId: string | null) => {
  const { data, isError, isFetched, isLoading } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => getMessages(chatId!),
    enabled: !!chatId,
  });
  return {
    data,
    isError,
    isFetched,
    isLoading,
  };
};

export default useGetMessages;
