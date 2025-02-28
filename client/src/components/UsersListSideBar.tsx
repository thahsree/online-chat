import useGetChats from "../hooks/useGetChats";

interface Props {
  setShowModal: (value: any) => void;
}
function UsersListSideBar({ setShowModal }: Props) {
  const { data, isLoading } = useGetChats();

  return (
    <>
      <div className="w-[35%] flex items-center flex-col px-5 bg-[#2c2a2a6d]  ">
        {/* heading */}
        <div className="flex justify-between w-full py-4 items-center">
          <div>My Chats</div>
          <div
            onClick={() => setShowModal((prev: any) => !prev)}
            className="p-1 bg-white text-black border rounded border-transparent"
          >
            New Group Chat
          </div>
        </div>
        <ul className="w-full flex flex-col gap-2 mt-3">
          {data ? (
            <>
              <li className="bg-[#342e2e] py-2 rounded px-2">Group 1</li>
              <li className="bg-[#342e2e] py-2 rounded px-2">Jane Doe</li>
              <li className="bg-[#342e2e] py-2 rounded px-2">John Doe</li>
            </>
          ) : isLoading ? (
            <p>LOADING</p>
          ) : (
            ""
          )}
        </ul>
      </div>
    </>
  );
}

export default UsersListSideBar;
