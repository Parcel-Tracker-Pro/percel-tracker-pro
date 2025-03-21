import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import createEmployee from "../../../api/auth/createEmployee";
import { FiEye, FiEyeOff } from "react-icons/fi";

const CreateAccountModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const createAccount = async (e) => {
    e.preventDefault();
    const data = {
      username: `Mi Mi - ${username}`,
      password: password,
      confirmPassword: confirmPassword,
    };

    const res = await createEmployee(data);
    // console.log(res);
    if (res.statusCode === 201) {
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      onClose();
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 m-5">
          <h2 className="text-2xl font-semibold mb-10">Create Account</h2>
          <form className="text-secondary">
            <label className="block mb-5">
              <span className="flex items-center mb-2">
                <FaRegCircleUser className="mr-5" size={20} />
                <span className="text-lg font-semibold">User Name</span>
              </span>
              <div className="flex items-center w-full p-3 px-4 border-2 border-gray-300 rounded">
                <div className="w-16">
                  <p>Mi Mi</p>
                </div>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-lg text-secondary focus:outline-none"
                />
              </div>
            </label>

            <label className="block mb-2">
              <span className="flex items-center mb-2">
                <RiLockPasswordLine className="mr-5" size={20} />
                <span className="text-lg font-semibold">Password</span>
              </span>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="mt-1 text-lg text-secondary focus:outline-none block w-full py-3 px-4 border-2 border-gray-300 rounded shadow-md"
                />
                <span
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                  className="absolute right-3 top-[18px]"
                >
                  {passwordVisible ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </span>
              </div>
            </label>

            <label className="block mb-2">
              <span className="flex items-center mb-2">
                <RiLockPasswordLine className="mr-5" size={20} />
                <span className="text-lg font-semibold">Confirm Password</span>
              </span>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter Password"
                  className={`mt-1 text-lg block text-secondary focus:outline-none w-full py-3 px-4 rounded shadow-md border-2 ${
                    password !== confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ cursor: "pointer" }}
                  className="absolute right-3 top-[18px]"
                >
                  {confirmPasswordVisible ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </span>
              </div>
              {password !== confirmPassword && (
                <p className="text-red-500 text-end text-sm">
                  Your password doesn't match
                </p>
              )}
            </label>

            <div className="flex justify-between gap-5 mt-10">
              <button
                type="button"
                className="text-center w-1/3"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={createAccount}
                className={`flex gap-4 font-bold justify-center rounded-md p-4 w-2/3  ${
                  username !== "" && password !== "" && confirmPassword !== ""
                    ? "bg-primary text-[#0E3F66] hover:scale-105 active:scale-95"
                    : "button-color"
                }`}
                disabled={
                  username === "" ||
                  password === "" ||
                  confirmPassword === "" ||
                  password !== confirmPassword
                }
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateAccountModal;
