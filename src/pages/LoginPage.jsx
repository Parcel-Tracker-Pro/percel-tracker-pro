import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import handleLogin from "../api/auth/login";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showpw, setshowpw] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async () => {
    const data = {
      username,
      password,
    };

    const res = await handleLogin(data);

    console.log(res.data.user.role);
    if (res.data.user.role === "owner") {
      navigate("/admin");
    } else {
      navigate("/employee");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="bg-white py-8 px-10 rounded-lg lg:shadow-lg lg:border border-gray-300">
        <h2 className="text-3xl font-bold mb-10">Login</h2>

        <label className="block mb-5">
          <span className="flex items-center mb-2">
            <FaRegCircleUser className="mr-5" size={20} />
            <span className="text-lg font-semibold">User Name</span>
          </span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Name"
            className="mt-1 text-lg block w-full p-3 px-4 border-2 border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2 relative">
          <span className="flex items-center mb-2">
            <RiLockPasswordLine className="mr-5" size={20} />
            <span className="text-lg font-semibold">Password</span>
          </span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showpw ? "text" : "password"}
            placeholder="Enter Password"
            className="mt-1 text-lg block w-full py-3 px-4 border-2 border-gray-300 rounded shadow-md"
          />
          <button
            onClick={() => setshowpw(!showpw)}
            className="absolute bottom-2 right-3 transform -translate-y-1/2 cursor-pointer"
          >
            {showpw ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </label>
        <Link
          to="/forgotpassword"
          className="text-sm text-end text-primary font-bold mt-1 block mb-5"
        >
          Forget Password?
        </Link>

        <button
          className="w-full bg-primary text-lg font-bold text-white py-3 rounded hover:bg-gray-700 transition"
          onClick={() => submitLogin()}
        >
          Login Account
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
