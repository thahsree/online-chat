import useGetChats from "../hooks/useGetChats";

interface Props {
  setShowModal: (value: boolean) => void;
}

function GroupChatModal({ setShowModal }: Props) {
  const { data } = useGetChats();
  console.log(data, "USERS FROM MODEL");
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
            className="rounded-full w-[50px] h-[50px] max-sm:w-[25px] max-sm:h-[25px]"
          >
            <img src="/close.svg" alt="" className="w-full h-full" />
          </button>
        </div>
        <div className="">
          <p>Group Name</p>
          <input
            type="text"
            placeholder="Enter Group Name"
            className="rounded py-1 w-full bg-[#2c2a2a] caret-white border border-[#c0c09d]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>ADD MEMBERS</p>

          <ul className="flex flex-wrap items-center justify-center  flex-col bg-red-50 w-full overflow-auto">
            {data.map((item: any) => {
              if (!item.isGroupChat) {
                const sender = getSenderDetails(item.users);

                return (
                  <li className="text-start px-15 py-4 w-full bg-red-500">
                    {sender.name}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
      <button className="bg-[#2c2a2a] py-3 px-6 rounded border border-[#c0c0c09d] ">
        CREATE GROUP
      </button>
    </div>
  );
}

export default GroupChatModal;
