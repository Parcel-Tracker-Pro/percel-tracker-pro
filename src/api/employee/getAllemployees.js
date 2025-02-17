import axios from "./../axios";
import { toast } from "sonner";
// import { jwtDecode } from "jwt-decode";

const getAllEmployees = async () => {
  try {
    const response = await axios.get("api/v1/user");
    return response.data;
  } catch (error) {
    toast.error(`${error.response.data.message}`, {
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
  }
};

export default getAllEmployees;
