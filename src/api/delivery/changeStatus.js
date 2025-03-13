import axios from "../axios";
import { toast } from "sonner";

const changeStatus = async ({ data, id }) => {
  console.log(data);
  try {
    const response = await axios.patch(`api/v1/parcel-batch/${id}`, data);
    toast.success("Delivery have been confirmed!", {
      autoClose: 200, // Auto-close the toast after 5 seconds
    });
    console.log(response.data);
    return response.data;
    return response.data;
  } catch (error) {
    toast.error(`${error.response.data.message}`, {
      autoClose: 200,
    });
  }
};

export default changeStatus;
