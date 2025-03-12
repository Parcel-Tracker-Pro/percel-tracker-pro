import { motion } from "framer-motion";
import deletesvg from "./../../assets/images/delete.svg";
import { Trash } from "lucide-react";

const ConfirmModel = ({ isOpen, onClose, submit, text }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <motion.div className="border border-gray-300 shadow-lg p-10 rounded-md bg-white max-w-sm mx-auto">
        <div className="text-center">
          <img src={deletesvg} alt="delete" className="w-48 mx-auto" />
          <h2 className="text-lg sub-header font-bold py-2">
            {text ? text : "Are you sure you want to delete?"}
          </h2>
          <div className="flex justify-center gap-4 md:gap-10 mt-4 ">
            <button
              onClick={onClose}
              className="border border-gray-300 rounded-md p-4 text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="flex gap-4 border border-red-500 font-bold rounded-md p-4 text-white bg-red-500 hover:bg-red-600 active:scale-95"
            >
              Delete Parcel
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmModel;
