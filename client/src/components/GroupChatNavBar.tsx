interface Props {
  cachedData: any;
}
const GroupChatNavBar = ({ cachedData }: Props) => {
  console.log(cachedData?.chatName, "data from group chat");
  return (
    <div className="absolute top-0 w-full bg-[#000000] h-[70px]">
      <div className="w-full h-full items-center flex justify-between p-4 bg-[#2c2a2a6d]">
        <div className="w-full h-full items-center flex gap-3">
          <div className="h-[30px] rounded-full w-[30px] bg-red-500"></div>
          <h3 className="font-medium">{cachedData?.chatName}</h3>
        </div>
      </div>
    </div>
  );
};

export default GroupChatNavBar;
