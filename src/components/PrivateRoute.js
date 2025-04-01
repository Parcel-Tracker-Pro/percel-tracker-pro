import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import handleTokenExpiration from "./TokenExpired";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  //   handleTokenExpiration();
  const token = localStorage.getItem("percel");
  if (token) {
    return children;
  } else {
    return useEffect(() => {
      navigate("/");
    }, []);
  }
}

export default PrivateRoute;
