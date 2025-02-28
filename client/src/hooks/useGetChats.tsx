import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetChats = () => {
  const PORT = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("userCredentials");

  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      if (token) {
        const res = await axios.get(`${PORT}/chats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return res.data;
      }
    },
    refetchOnWindowFocus: false,
  });
};

export default useGetChats;
