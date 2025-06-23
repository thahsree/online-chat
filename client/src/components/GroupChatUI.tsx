interface Props {
  cachedData: any;
}
function GroupChatUI({ cachedData }: Props) {
  console.log("cached Data", cachedData);
  const user = JSON.parse(localStorage.getItem("loggedUser") || "{}");

  return (
    <ul className="flex flex-col mb-5 gap-2">
      {cachedData?.messages.map((item: any, index: number) => {
        const isSameSenderAsPrevious =
          index > 0 &&
          cachedData.messages[index - 1].sender?._id === item.sender?._id;

        return (
          <li
            key={index}
            className={`flex gap-3 ${
              item.sender?._id === user?._id ? "self-end" : "self-start"
            } `}
          >
            <div
              className={`p-1 px-2 text-black flex flex-col ${
                item.sender._id === user?._id
                  ? "rounded-es-xl rounded-ss-xl rounded-ee-xl  bg-slate-500 text-white"
                  : "rounded-e-xl rounded-es-xl dark:bg-gray-300"
              } border border-none `}
            >
              {!isSameSenderAsPrevious && (
                <span
                  className={`text-xs underline ${
                    item.sender._id === user?._id
                      ? "text-gray-900"
                      : "text-red-800"
                  }`}
                >
                  {item.sender._id === user?._id ? "me" : item.sender.userName}
                </span>
              )}
              {item.content}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default GroupChatUI;
