import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import updatepassword from "../../api/auth/updatepassword";

const UpdatePassword = ({ isOpen, onClose }) => {
  //   const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showpw, setshowpw] = useState(false);
  const [showconfirmpw, setshowConfirmpw] = useState(false);

  const createAccount = async (e) => {
    e.preventDefault();
    const data = {
      //   username,
      newPassword,
      confirmPassword,
    };

    const res = await updatepassword(data);
    console.log(res);
    if (res.statusCode === 201) {
      //   setUsername("");
      setNewPassword("");
      setConfirmPassword("");
      onClose();
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 m-5">
          <h2 className="text-2xl font-semibold mb-10">Create Account</h2>
          <div>
            <label className="block mb-2 text-primary relative">
              <span className="flex items-center mb-2">
                <RiLockPasswordLine className="mr-5" size={20} />
                <span className="text-lg font-semibold">Password</span>
              </span>
              <input
                type={showpw ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter Password"
                className="mt-1 text-lg block w-full py-3 px-4 border-2 border-gray-300 rounded shadow-md"
              />
              <button
                onClick={() => setshowpw(!showpw)}
                className="absolute bottom-2 right-3 transform -translate-y-1/2 cursor-pointer"
              >
                {showpw ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </button>
            </label>

            <label className="block mb-2 text-primary relative">
              <span className="flex items-center mb-2">
                <RiLockPasswordLine className="mr-5" size={20} />
                <span className="text-lg font-semibold">Password</span>
              </span>
              <input
                type={showconfirmpw ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter Password"
                className="mt-1 text-lg block w-full py-3 px-4 border-2 border-gray-300 rounded shadow-md"
              />
              <button
                onClick={() => setshowConfirmpw(!showpw)}
                className="absolute bottom-2 right-3 transform -translate-y-1/2 cursor-pointer"
              >
                {showconfirmpw ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </button>
            </label>
            <div className="flex justify-between gap-5 mt-10">
              <button
                type="button"
                className="rounded-md px-7 py-3 border border-primary text-sm text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={createAccount}
                className="w-full bg-primary text-white rounded-md px-2 py-3 hover:bg-blue-600"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UpdatePassword;
