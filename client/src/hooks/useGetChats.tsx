import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PORT = import.meta.env.VITE_BASE_URL;
const token = JSON.parse(localStorage.getItem("userCredentials") || "{}");

const fetchChats = async () => {
  if (token) {
    const res = await axios.get(`${PORT}/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("RESPONSE", res.data);
    return res.data;
  }
};

const createChat = async (users: string[] | null) => {
  if (users) {
    const res = axios.post(`${PORT}/chats/group`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  }
};

const useGetChats = () => {
  const { data, isError, isFetched, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
    refetchOnWindowFocus: false,
  });

  return {
    isError,
    isLoading,
    data,
    isFetched,
    createChat,
  };
};

export default useGetChats;
