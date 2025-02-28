import axios from "axios";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface MyComponentProps {
  setIsActive: Dispatch<SetStateAction<string>>; // Define the prop type
}

const Signup: React.FC<MyComponentProps> = ({ setIsActive }) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showCPass, setShowCPass] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const PORT = import.meta.env.VITE_BASE_URL;
    try {
      if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        return alert("please fill required fields");
      }
      if (formData.password !== formData.confirmPassword) {
        alert("password miss-match");
        setShowCPass(true);
        setShowPass(true);
        return;
      }
      const dataToSend = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const res = await axios.post(`${PORT}/users/register`, dataToSend);

      console.log("Response", res);
      alert("Signup completed");
      setIsActive("login");
      console.log("working");
      return;
    } catch (error: any) {
      alert(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="username" className="text-white">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          value={formData.username}
          onChange={handleInputChange}
          required
          type="text"
          placeholder="Enter your name"
          id="username"
          className="border-b bg-trasparent text-white  py-1 px-1"
        />

        <label htmlFor="email" className="text-white mt-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          value={formData.email}
          onChange={handleInputChange}
          required
          type="email"
          placeholder="Enter your email address"
          id="email"
          className="border-b bg-trasparent text-white  py-1 px-1"
        />

        <label htmlFor="password" className="text-white mt-2">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="w-full relative">
          <input
            value={formData.password}
            onChange={handleInputChange}
            required
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

        <label htmlFor="confirmPassword" className="text-white mt-2">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <div className="w-full relative">
          <input
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            placeholder="Confirm password"
            type={showCPass ? "text" : "password"}
            id="confirmPassword"
            className="border-b bg-transparent  text-white py-1 px-1 w-full pr-[13%]"
          />
          <div
            onClick={() => setShowCPass((prev) => !prev)}
            className="w-max h-max absolute right-2 top-[20%] text-white text-sm cursor-pointer"
          >
            {showCPass ? "hide" : "show"}
          </div>
        </div>
        <label htmlFor="upload" className="text-white mt-3">
          Upload your picture
        </label>
        <input type="file" id="upload" className="bg-transparent text-white" />

        <button className="border mt-3 bg-blue-600 rounded-lg py-2  border-transparent font-semibold">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
