import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Home = () => {
  const [isActive, setIsActive] = useState("login");

  return (
    <div className="w-[100vw] h-[100vh] flex pt-6 justify-center">
      {/* Content */}
      <div className="flex w-[500px] flex-col gap-5 relative z-10 ">
        {/* Header */}
        <div className="flex items-center p-3 bg-[#373a43a9] w-[100%] border-[1px] border-gray-600 rounded-lg justify-center">
          <h3 className="text-4xl font-light font-mono text-white text-center">
            CHIT CHAT
          </h3>
        </div>

        {/* Tabs Section */}
        <div className="bg-[#373a43a9] p-3 w-[100%] rounded-lg flex flex-col gap-4 border border-gray-600">
          <div className="flex w-full justify-between gap-2">
            <div
              onClick={() => setIsActive("login")}
              className={`text-black font-semibold flex-1 text-center border border-transparent rounded-full cursor-pointer py-2 ${
                isActive === "login" ? "bg-blue-200 text-black" : "text-white"
              }`}
            >
              Login
            </div>
            <div
              onClick={() => setIsActive("signup")}
              className={`text-black font-semibold flex-1 text-center border border-transparent rounded-full cursor-pointer py-2 ${
                isActive === "signup" ? "bg-blue-200 text-black" : "text-white"
              }`}
            >
              Signup
            </div>
          </div>

          <div className="w-full p-1">
            {isActive === "signup" ? (
              <Signup setIsActive={setIsActive} />
            ) : (
              <Login />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
