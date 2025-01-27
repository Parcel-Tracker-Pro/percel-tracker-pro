import React from "react";
import forgot from "./../assets/images/Forgot.svg";

function ForgotPassword() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <img src={forgot} alt="forgot" />
        <div className="text-center">
          <p className="font-bold text-xl mb-2">Forget Password?</p>
          <p className="font-normal text-md mb-2">
            Don’t Worry! Contact the <br /> Admin for further information!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
