import { useState } from "react";

function Profile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="absolute top-[55px] right-[10px] bg-[#242323] h-max rounded-lg border  border-[#565555cb] px-5 py-2 text-sm">
      <ul className="border-b border-[#565555cb] flex flex-col gap-1 pb-2">
        <li className="hover:bg-[#2c2a2a99] p-2 rounded-lg  cursor-pointer">
          Profile
        </li>
        <li className="hover:bg-[#2c2a2a99] p-2 rounded-lg cursor-pointer">
          Settings
        </li>
        <li className="hover:bg-[#2c2a2a99] p-2 rounded-lg cursor-pointer">
          Archived Chats
        </li>
      </ul>
      <ul className="flex flex-col gap-3 mt-1">
        <li className="hover:bg-[#2c2a2a99] p-2 rounded-lg  cursor-pointer">
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Profile;
