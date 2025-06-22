import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { createSocket } from "../lib/Socket";

const PORT = import.meta.env.VITE_BASE_URL;
let socket: Socket | null = null;

const fetchUser = async () => {
  const user = localStorage.getItem("loggedUser");
  if (!user) throw new Error("user not found");

  return JSON.parse(user);
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchUser,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (user && (!socket || !socket.connected)) {
      socket = createSocket(user._id);
      socket.connect();

      socket.on("getOnlineUsers", (userIds: string[]) => {
        setOnlineUsers(userIds);
        console.log("ONLINE USERS", userIds);
      });
    }
  }, [user]);

  const loginMutation = useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
      const res = await axios.post(`${PORT}/users/login`, formData);
      const user = res.data.userData._doc;
      const { password, ...cleanedUser } = user;
      localStorage.setItem("userCredentials", JSON.stringify(res.data.token));
      localStorage.setItem("loggedUser", JSON.stringify(cleanedUser));

      return cleanedUser;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["authUser"], user);
      alert("User logged in");
      console.log(user, "USER<<<<");
      navigate("/chats");

      //check already connected to socket
      if (!socket || !socket.connected) {
        socket = createSocket(user._id);
        socket.connect();
      }
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || "Login failed");
    },
  });

  // 🔹 Logout Mutation
  const logout = () => {
    localStorage.removeItem("userCredentials");
    localStorage.removeItem("loggedUser");
    if (socket) {
      socket.disconnect();
    }
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
    onlineUsers,
  };
};
