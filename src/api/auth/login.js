import axios, { setAuthToken } from "./../axios";
import { toast } from "sonner";
// import { jwtDecode } from "jwt-decode";

const handleLogin = async (data) => {
  const toastId = toast.loading("Logging in...");
  try {
    const response = await axios.post("api/v1/user/login", data);
    toast.success("Logged in successfully!", {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
    const percelToken = response.data.data.token;
    setAuthToken(percelToken);
    localStorage.setItem("percel", percelToken);

    return response.data;
  } catch (error) {
    toast.error(`${error.response.data.message}`, {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
  }
};

export default handleLogin;
