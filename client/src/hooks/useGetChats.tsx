import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const PORT = import.meta.env.VITE_BASE_URL;
const token = JSON.parse(localStorage.getItem("userCredentials") || "{}");

const useGetChats = () => {
  const queryClient = useQueryClient();

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

  const createGroupChat = async (users: string[] | null, name: string) => {
    if (users || name) {
      const res = await axios.post(
        `${PORT}/chats/group`,
        {
          name,
          users,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      queryClient.setQueryData(["chats"], (oldData: any) => {
        if (!oldData) return res.data;
        return [res.data, ...oldData];
      });
      return res.data;
    }
  };

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
    createGroupChat,
  };
};

export default useGetChats;
