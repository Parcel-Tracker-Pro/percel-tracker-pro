import axios from "../axios";
import { toast } from "sonner";

const DeleteDelivery = async (id) => {
  const toastId = toast.loading("Please wait...");
  try {
    const response = await axios.delete(`api/v1/parcel-batch/${id}`);
    // console.log(response.data);
    toast.success("Delivery deleted successfully!", {
      autoClose: 200, // Auto-close the toast after 5 seconds
      id: toastId,
    });
    return response.data;
  } catch (error) {
    toast.error(`${error.response.data.message}`, {
      autoClose: 200,
      id: toastId,
    });
  }
};

export default DeleteDelivery;
