import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socket from "../lib/Socket";
const PORT = import.meta.env.VITE_BASE_URL;

const fetchUser = async () => {
  const user = localStorage.getItem("loggedUser");
  if (!user) throw new Error("user not found");

  return JSON.parse(user);
};

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchUser,
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
      const res = await axios.post(`${PORT}/users/login`, formData);
      const user = res.data.userData._doc;
      const { password, ...cleanedUser } = user;
      localStorage.setItem("userCredentials", JSON.stringify(res.data.token));
      localStorage.setItem("loggedUser", JSON.stringify(cleanedUser));
      if (!socket.connected) {
        socket.connect();
        console.log("socket connected");
      }
      return cleanedUser;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
      alert("User logged in");
      console.log(data, "USER<<<<");
      navigate("/chats");
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || "Login failed");
    },
  });

  // 🔹 Logout Mutation
  const logout = () => {
    localStorage.removeItem("userCredentials");
    localStorage.removeItem("loggedUser");
    socket.disconnect();
    queryClient.removeQueries({ queryKey: ["authUser"] });
    navigate("/");
  };

  return {
    user,
    isLoading,
    isError,
    login: loginMutation.mutate,
    isAuthenticated: !user,
    loginStatus: loginMutation.status,
    logout,
  };
};
