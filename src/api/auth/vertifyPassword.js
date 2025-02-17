import axios from "./../axios";
import { toast } from "sonner";
// import { jwtDecode } from "jwt-decode";

const vertifypassword = async (data) => {
  try {
    const response = await axios.post("api/v1/user", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error) {
      toast.error(`${error.response.data.message}`, {
        autoClose: 500, // Auto-close the toast after 5 seconds
      });
    }
  }
};

export default vertifypassword;
