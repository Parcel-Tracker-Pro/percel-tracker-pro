import React from "react";
import forgot from "./../assets/images/Forgot.svg";

function ForgotPassword() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <img src={forgot} alt="forgot" />
        <div className="text-center">
          <p className="font-bold text-xl mb-2">Forget Password?</p>
          <p className="font-normal text-md mb-2">
            Don’t Worry! Contact the <br /> Admin for further information!
          </p>
        </div>
      </div>
      <button className="bg-primary mt-2 text-md py-3 px-10 rounded-md">
        Close
      </button>
    </div>
  );
}

export default ForgotPassword;
