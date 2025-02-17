import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import vertifypassword from "../../api/auth/vertifyPassword";
import UpdatePassword from "./UpdatePassword";
import { Cookies } from "react-cookie";

const VertifyPassword = ({ isOpen, onClose }) => {
  const [verifyPassword, setvertifyPassword] = useState("");
  const [showpw, setshowpw] = useState(false);
  const [modelOpen, setModalOpen] = useState(false);

  const vertifypw = async (e) => {
    e.preventDefault();
    const data = {
      verifyPassword,
    };

    const res = await vertifypassword(data);
    console.log(res);
    if (res.code === 200) {
      setModalOpen(true);
      console.log(res);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 m-5">
          <h2 className="text-2xl font-semibold mb-10">Owner Verification</h2>
          <div>
            <label className="block mb-2 text-primary relative">
              <span className="flex items-center mb-2">
                <RiLockPasswordLine className="mr-5" size={20} />
                <span className="text-lg font-semibold">Password</span>
              </span>
              <input
                type={showpw ? "text" : "password"}
                value={verifyPassword}
                onChange={(e) => setvertifyPassword(e.target.value)}
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

            <div className="flex justify-between gap-5 mt-10">
              <button
                type="button"
                className="rounded-md w-full py-3 border border-primary text-sm text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                Discard
              </button>
              <button
                type="submit"
                onClick={vertifypw}
                className="w-full bg-primary text-white rounded-md px-2 py-3 hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>

        <UpdatePassword
          isOpen={modelOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    )
  );
};

export default VertifyPassword;
