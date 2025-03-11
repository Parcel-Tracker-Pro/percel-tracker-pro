import React from "react";
import ReactLoading from "react-loading";

function Loading() {
  return (
    <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center">
      <ReactLoading type="spin" color="orange" />
    </div>
  );
}

export default Loading;
