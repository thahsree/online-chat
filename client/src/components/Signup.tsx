import { useState } from "react";

const Signup = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showCPass, setShowCPass] = useState<boolean>(false);
  return (
    <div>
      <form action="" className="flex flex-col gap-1">
        <label htmlFor="name" className="text-white">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          required
          type="text"
          placeholder="Enter your name"
          id="name"
          className="border bg-white rounded-lg text-black  py-1 px-1"
        />

        <label htmlFor="email" className="text-white">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          required
          type="email"
          placeholder="Enter your email address"
          id="email"
          className="border bg-white rounded-lg text-black  py-1 px-1"
        />

        <label htmlFor="password" className="text-white">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="w-full relative">
          <input
            required
            placeholder="Enter password"
            type={showPass ? "text" : "password"}
            id="password"
            className="border bg-white rounded-lg text-black py-1 px-1 relative w-full pr-[13%]"
          />
          <div
            onClick={() => setShowPass((prev) => !prev)}
            className="w-max h-max absolute right-2 top-[20%] text-black text-sm cursor-pointer"
          >
            {showPass ? "hide" : "show"}
          </div>
        </div>

        <label htmlFor="confirm-password" className="text-white">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <div className="w-full relative">
          <input
            required
            placeholder="Confirm password"
            type={showCPass ? "text" : "password"}
            id="confirm-password"
            className="border bg-white rounded-lg text-black py-1 px-1 relative w-full pr-[13%]"
          />
          <div
            onClick={() => setShowCPass((prev) => !prev)}
            className="w-max h-max absolute right-2 top-[20%] text-black text-sm cursor-pointer"
          >
            {showCPass ? "hide" : "show"}
          </div>
        </div>
        <label htmlFor="upload" className="text-white">
          Upload your picture
        </label>
        <input type="file" id="upload" className="bg-white text-black" />

        <button className="border mt-3 bg-blue-500 rounded-lg py-1 border-transparent">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
