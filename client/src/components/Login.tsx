import { useState } from "react";

const Login = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <div>
      <form action="" className="flex flex-col gap-1">
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

        <button className="border mt-3 bg-blue-500 rounded-lg py-1 border-transparent">
          Login
        </button>
        <button className="border mt-1 bg-red-500 rounded-lg py-1 border-transparent">
          Continue as Guest
        </button>
      </form>
    </div>
  );
};

export default Login;
