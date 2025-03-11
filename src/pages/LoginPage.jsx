import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import handleLogin from "../api/auth/login";
import logo from "./../assets/images/logo/logo.svg";

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
    // console.log(data);

    const res = await handleLogin(data);

    // console.log(res);
    if (res.data.user.role === "owner") {
      navigate("/admin");
    } else {
      navigate("/employee");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="bg-white py-8 px-10">
        <div>
          <img src={logo} alt="logo" className="w-40 h-40 mx-auto" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-5">Login</h2>

        <label className="block mb-5">
          <span className="flex items-center mb-2">
            <FaRegCircleUser className="mr-2" size={18} />
            <span className="text-md md:text-lg text-secondary font-semibold">
              User Name
            </span>
          </span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Name"
            className="mt-1 text-lg block w-full py-4 lg:py-3 px-4 border-2 border-[#CBD2E0] focus:outline-none rounded placeholder:text-secondary"
          />
        </label>

        <label className="block mb-2 relative">
          <span className="flex items-center mb-2">
            <RiLockPasswordLine className="mr-2" size={18} />
            <span className="text-md lg:text-lg text-secondary font-semibold">
              Password
            </span>
          </span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showpw ? "text" : "password"}
            placeholder="Enter Password"
            className="mt-1 text-lg block w-full py-4 lg:py-3 px-4 border-2 border-[#CBD2E0] focus:outline-none rounded placeholder:text-secondary"
          />
          <button
            onClick={() => setshowpw(!showpw)}
            className="absolute bottom-3 right-3 transform -translate-y-1/2 cursor-pointer"
          >
            {showpw ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </label>
        <Link
          to="/forgotpassword"
          className="text-sm text-end text-primary font-bold mt-1 block mb-5 hover:text-secondary transition duration-300 hover:scale-105 hover:translate-x-[-10px] "
        >
          Forget Password?
        </Link>

        <button
          className="bg-primary font-bold w-full py-4 px-6 rounded hover:scale-105 hover:translate-x-[-10px] transition duration-300"
          onClick={() => submitLogin()}
        >
          Login Account
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
