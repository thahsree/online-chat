import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface searchUserProps {
  keyword: string;
}

const searchUser = async ({ keyword }: searchUserProps) => {
  const PORT = import.meta.env.VITE_BASE_URL;
  const token = JSON.parse(localStorage.getItem("userCredentials") || "{}");

  const { data } = await axios.get(
    `${PORT}/users?search=${encodeURIComponent(keyword)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
const useGetUser = ({ keyword }: searchUserProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", keyword],
    queryFn: () => searchUser({ keyword }),
    enabled: Boolean(keyword && keyword.trim()), //only runs when keyword is not empty
  });

  return {
    data,
    isLoading,
    isError,
  };
};

export default useGetUser;
