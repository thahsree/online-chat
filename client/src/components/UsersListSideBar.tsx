import React from "react";
import useGetChats from "../hooks/useGetChats";
import Loading from "./Loading";

interface Props {
  setShowModal: (value: any) => void;
  setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
  setOtherUser: React.Dispatch<React.SetStateAction<string>>;
  setIsGroupChat: React.Dispatch<React.SetStateAction<boolean>>;
}

function UsersListSideBar({
  setShowModal,
  setCurrentChat,
  setOtherUser,
  setIsGroupChat,
}: Props) {
  const { data, isLoading } = useGetChats();

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");

  const getSenderDetails = (users: any) => {
    if (!loggedUser) return { name: "", id: "", image: "" };

    const isCurrentUserFirst = users[0]._id === loggedUser._id;

    return {
      name: isCurrentUserFirst ? users[1].userName : users[0].userName,
      id: isCurrentUserFirst ? users[1]._id : users[0]._id,
      image: isCurrentUserFirst ? users[1].picture : users[0].picture,
    };
  };

  const accessChat = (
    chatId: string,
    otherUserId: string,
    isGroupChat: boolean
  ) => {
    setCurrentChat(chatId);
    setOtherUser(otherUserId);
    setIsGroupChat(isGroupChat);
  };

  return (
    <div className="flex flex-col justify-between w-[35%] bg-[#2c2a2a6d]">
      <div className="w-full flex items-center flex-col px-5 ">
        <div className="flex justify-between w-full py-4 items-center">
          <div>My Chats</div>
          <div
            onClick={() => setShowModal((prev: any) => !prev)}
            className="p-1 bg-white text-black border rounded border-transparent"
          >
            New Group Chat
          </div>
        </div>

        <ul className="w-full flex flex-col gap-2 mt-3 ">
          {data ? (
            data.map((item: any, index: number) => {
              const { name, id, image } = getSenderDetails(item.users);
              return (
                <li
                  key={index}
                  className="flex gap-3 bg-[#2c2a2a] p-2 rounded text-sm font-normal items-center"
                  onClick={() => accessChat(item._id, id, item.isGroupChat)}
                >
                  <img
                    src={!item.isGroupChat ? image : "/group.svg"}
                    alt="profile"
                    className="w-[35px] h-[35px] rounded-full"
                  />
                  <div className="flex flex-col gap-2">
                    {!item.isGroupChat ? name : item.chatName}
                    <p className="text-xs">latest message here</p>
                  </div>
                </li>
              );
            })
          ) : isLoading ? (
            <Loading type="sidebar" />
          ) : null}
        </ul>
      </div>

      <div className="p-5 flex items-center">
        <div className="w-full flex gap-2 p-3 bg-[#2c2a2a] text-center items-center justify-center">
          <div className="w-[25px] h-[25px]">
            <img src="/global.svg" alt="" className="w-full h-full" />
          </div>
          <p>Find Users</p>
        </div>
      </div>
    </div>
  );
}

export default UsersListSideBar;
