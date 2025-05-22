interface Props {
  cachedData: any;
}
export const SenderUI = ({ cachedData }: Props) => {
  console.log("cachedData", cachedData);
  const user = JSON.parse(localStorage.getItem("loggedUser") || "{}");

  return (
    <ul className="flex flex-col mb-5 gap-2">
      {cachedData?.messages.map((item: any, index: number) => (
        <li
          key={index}
          className={`flex gap-3 ${
            item.sender === user?._id ? "self-end" : "self-start"
          } `}
        >
          <div
            className={`p-1 px-2 text-black ${
              item.sender === user?._id
                ? "rounded-es-xl rounded-ss-xl rounded-ee-xl  bg-slate-500 text-white"
                : "rounded-e-xl rounded-es-xl dark:bg-gray-300"
            } border border-none `}
          >
            {item.content}
          </div>
        </li>
      ))}
    </ul>
  );
};
