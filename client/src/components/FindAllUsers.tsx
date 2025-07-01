import { useState } from "react";
import useGetUser from "../hooks/useGetUser";

interface Props {
  setFindAllUsers: (value: boolean) => void;
}

const FindAllUsers = ({ setFindAllUsers }: Props) => {
  const [keyword, setKeyword] = useState<string>("");
  const { data, isError, isLoading } = useGetUser({ keyword });

  console.log(data);

  return (
    <div className="w-full h-full flex flex-col gap-5 py-5 items-center bg-[#2c2a2a6d] px-2">
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
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="border py-2 px-4 rounded hover:bg-white hover:text-black transition">
            search
          </button>
        </div>
      </div>

      <div className="w-full px-1 flex items-center flex-col py-4 gap-2 overflow-y-auto">
        {/* map from here */}
        {isLoading && <p>Loading</p>}
        {isError && <p>Error while fetching Data</p>}
        {data && data.length > 0 ? (
          data.map((item: any) => (
            <div
              key={item._id}
              className="w-[600px] py-3 bg-[#2c2a2a] flex justify-between items-center px-5 rounded"
            >
              <div className="flex gap-3 items-center">
                <div className="w-[30px] h-[30px] rounded-full">
                  <img
                    src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </div>
                <p>{item.userName}</p>
              </div>
              <button className="flex-end border rounded py-1 px-2 outline-none">
                Add User
              </button>
            </div>
          ))
        ) : (
          <p>no users found</p>
        )}
      </div>
    </div>
  );
};

export default FindAllUsers;
