import React from "react";
import ReactLoading from "react-loading";
import { motion } from "framer-motion";

function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[calc(100vh-300px)] flex items-center justify-center"
    >
      <ReactLoading type="spin" color="orange" />
    </motion.div>
  );
}

export default Loading;
