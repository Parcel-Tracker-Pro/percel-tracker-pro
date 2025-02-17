import axios from "./../axios";
import { toast } from "sonner";
// import { jwtDecode } from "jwt-decode";

const updatepassword = async (data) => {
  console.log(document.cookie);

  try {
    const response = await axios.patch("api/v1/user/owner", data, {
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

export default updatepassword;
