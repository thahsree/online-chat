import { useEffect, useState } from "react";
import useGetChats from "../hooks/useGetChats";

interface Props {
  setShowModal: (value: boolean) => void;
}

function GroupChatModal({ setShowModal }: Props) {
  const [groupName, setGroupName] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);
  const { data, createGroupChat } = useGetChats();

  const submitForm = () => {
    if (!groupName.trim() && users.length < 2) {
      alert(
        "please add groupname and add atleast 2 members for creating group chat"
      );
      return;
    } else if (!groupName.trim()) {
      alert("please add groupname");
      return;
    } else if (users.length < 2) {
      alert(" atleast two users needed for creating a group chat");
    }
    createGroupChat(users, groupName);
    setShowModal(false);
  };

  const toggleUsersFromGroup = (id: string) => {
    if (users?.includes(id)) {
      const res = users.filter((userId) => userId !== id);
      setUsers(res);
    } else {
      setUsers((prev) => [...(prev || []), id]);
    }
  };

  useEffect(() => {
    console.log(users);
  }, [users]);
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
  return (
    <div className="w-full h-full flex flex-col justify-between gap-5 py-5 ">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center w-full py-5 px-3 ">
          <h3 className="w-full text-2xl max-sm:text-lg text-center">
            CREATE GROUP CHAT
          </h3>
          <button
            onClick={() => setShowModal(false)}
            className="rounded-full w-[50px] h-[50px] max-sm:w-[25px] max-sm:h-[25px] outline-none"
          >
            <img src="/close.svg" alt="" className="w-full h-full" />
          </button>
        </div>
        <div className="">
          <p>Group Name</p>
          <input
            type="text"
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter Group Name"
            className="pl-1 rounded py-1 w-full bg-[#2c2a2a] caret-white border border-[#c0c0c057]"
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>ADD MEMBERS</p>

          <ul className="flex flex-wrap items-center justify-center  flex-col gap-1 w-full overflow-auto">
            {data.map((item: any, index: number) => {
              if (!item.isGroupChat) {
                const sender = getSenderDetails(item.users);

                return (
                  <li
                    className="text-start h-[50px] flex justify-between items-center pl-3 pr-3 py-2 w-full bg-[#2c2a2ae0] border border-[#c0c0c057]"
                    onClick={() => toggleUsersFromGroup(sender.id)}
                    key={index}
                  >
                    <p>{sender.name}</p>
                    <div className="h-[30px] w-[30px]  rounded-full cursor-pointer">
                      <img
                        src={`${
                          users?.includes(sender.id) ? "minus.svg" : "/add.svg"
                        }`}
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
      <button
        onClick={submitForm}
        className="bg-[#2c2a2a] py-3 px-6 rounded border border-[#c0c0c09d] "
      >
        CREATE GROUP
      </button>
    </div>
  );
}

export default GroupChatModal;
