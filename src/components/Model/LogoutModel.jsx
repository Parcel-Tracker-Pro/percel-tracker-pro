import { motion } from "framer-motion";
import deletesvg from "./../../assets/images/logout.svg";
import { MdOutlineLogout } from "react-icons/md";

const LogoutModel = ({ isOpen, onClose, submit, text }) => {
  if (!isOpen) return null;

  // Define animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <motion.div
        className="border border-gray-300 shadow-lg p-10 rounded-md bg-white max-w-sm mx-auto"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <img src={deletesvg} alt="delete" className="w-48 mx-auto" />
          <h2 className="text-lg sub-header font-bold py-2">
            {text ? text : "Are you sure you want to delete?"}
          </h2>
          <div className="flex justify-center gap-4 md:gap-10 mt-4 ">
            <button
              onClick={onClose}
              className="rounded-md p-4 text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="flex gap-4 font-bold rounded-md py-4 px-10 text-color button-color hover:scale-105 active:scale-95"
            >
              Logout
              <MdOutlineLogout className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LogoutModel;
