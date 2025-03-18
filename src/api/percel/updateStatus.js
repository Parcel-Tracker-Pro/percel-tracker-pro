import axios from "../axios";
import { toast } from "sonner";

const UpdateStatus = async (data, id) => {
  console.log(id);
  const toastId = toast.loading("Please wait...");

  try {
    const response = await axios.patch(`api/v1/parcel/status/${id}`, data);
    toast.success("Parcel updated successfully!", {
      id: toastId,
      autoClose: 200, // Auto-close the toast after 5 seconds
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(`${error.response.data.message}`, {
      id: toastId,
      autoClose: 200,
    });
  }
};

export default UpdateStatus;
