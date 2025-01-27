import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";

const CreateAccountModal = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 m-5">
          <h2 className="text-2xl font-semibold mb-10">Create Account</h2>
          <form>
            <label className="block mb-5 text-primary">
              <span className="flex items-center mb-2">
                <FaRegCircleUser className="mr-5" size={20} />
                <span className="text-lg font-semibold">User Name</span>
              </span>
              <input
                type="text"
                placeholder="Enter Name"
                className="mt-1 text-lg block w-full p-3 px-4 border-2 border-gray-300 rounded"
              />
            </label>

            <label className="block mb-2 text-primary">
              <span className="flex items-center mb-2">
                <RiLockPasswordLine className="mr-5" size={20} />
                <span className="text-lg font-semibold">Password</span>
              </span>
              <input
                type="password"
                placeholder="Enter Password"
                className="mt-1 text-lg block w-full py-3 px-4 border-2 border-gray-300 rounded shadow-md"
              />
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
                className="w-full bg-primary text-white rounded-md px-2 py-3 hover:bg-blue-600"
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
