import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!formData.email || !formData.password) {
        alert("Please add required field");
      }
      const PORT = import.meta.env.VITE_BASE_URL;

      const res = await axios.post(`${PORT}/users/login`, formData);
      console.log("response", res);
      const loggedUser = res.data.userData._doc;
      const { password, ...userDataWithNoPass } = loggedUser;
      localStorage.setItem("userCredentials", JSON.stringify(res.data.token));
      localStorage.setItem("loggedUser", JSON.stringify(userDataWithNoPass));

      //Add toast
      alert("user logged in");
      navigate("/chats");
    } catch (error: any) {
      alert(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="email" className="text-white">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          onChange={handleInputChange}
          required
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          id="email"
          className="border-b bg-transparent  text-white  py-1 px-1"
        />

        <label htmlFor="password" className="text-white mt-2">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="w-full relative">
          <input
            required
            onChange={handleInputChange}
            value={formData.password}
            placeholder="Enter password"
            type={showPass ? "text" : "password"}
            id="password"
            className="border-b bg-transparent text-white py-1 px-1 w-full pr-[13%]"
          />
          <div
            onClick={() => setShowPass((prev) => !prev)}
            className="w-max h-max absolute right-2 top-[20%] text-white text-sm cursor-pointer"
          >
            {showPass ? "hide" : "show"}
          </div>
        </div>

        <button className="border mt-4 bg-blue-600 rounded-lg py-2 border-transparent font-semibold">
          Login
        </button>
        <button className="border mt-1 bg-red-600 rounded-lg py-2 border-transparent font-semibold">
          Continue as Guest
        </button>
      </form>
    </div>
  );
};

export default Login;
