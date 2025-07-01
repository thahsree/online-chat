interface Props {
  cachedData: any;
}
const GroupChatNavBar = ({ cachedData }: Props) => {
  console.log(cachedData, "data from group chat");
  const user = JSON.parse(localStorage.getItem("loggedUser") || "{}");

  return (
    <div className="w-full bg-[#000000] h-[70px]">
      <div className="w-full h-full items-center flex justify-between p-4 bg-[#2c2a2a82]">
        <div className="w-full h-full items-center flex gap-3">
          <div className="h-[30px] rounded-full w-[30px]">
            <img
              src={
                !cachedData.isGroupChat
                  ? cachedData.users
                      .filter((item: any) => item._id !== user._id)
                      .map((item: any) => item.picture)
                      .join(", ")
                  : "/group.svg"
              }
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h3 className="font-medium">
            {!cachedData.isGroupChat
              ? cachedData.users
                  .filter((item: any) => item._id !== user._id)
                  .map((item: any) => item.userName)
                  .join(", ")
              : cachedData?.chatName}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default GroupChatNavBar;
