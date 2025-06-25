import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const createChat = async (users: string[] | null) => {
  const PORT = import.meta.env.VITE_BASE_URL;
  const token = JSON.parse(localStorage.getItem("userCredentials") || "{}");

  if (users) {
    const res = axios.post(`${PORT}/chats/group`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

const useCreateChat = (users: string[] | null) => {
  const { data, isError, isFetched, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () => createChat(users),
    refetchOnWindowFocus: false,
  });

  return {
    isError,
    isFetched,
    isLoading,
    data,
  };
};
