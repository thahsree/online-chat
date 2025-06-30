interface Props {
  setFindAllUsers: (value: boolean) => void;
}

const FindAllUsers = ({ setFindAllUsers }: Props) => {
  return (
    <div className="w-full h-full flex flex-col gap-2 py-5 items-center">
      <div className="w-full flex justify-end">
        <button
          onClick={() => setFindAllUsers(false)}
          className="rounded-full w-[40px] h-[40px] max-sm:w-[25px] max-sm:h-[25px] outline-none"
        >
          <img src="/close.svg" alt="" className="w-full h-full" />
        </button>
      </div>
      <div className="flex px-3">
        <div className="flex w-full gap-5 text-white items-center">
          <input
            type="text"
            placeholder="search user"
            className="border rounded px-1 py-3 w-[500px]"
            autoFocus
          />
          <button className="border py-2 px-4 rounded hover:bg-white hover:text-black transition">
            search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindAllUsers;
