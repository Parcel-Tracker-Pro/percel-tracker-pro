import axios from "../axios";
import { toast } from "sonner";

const CreateDeliBatch = async (data) => {
  const toastId = toast.loading("Please wait...");
  //   console.log(data);
  try {
    const response = await axios.post(`api/v1/parcel-batch`, data);
    toast.success("New Delivery is successfully added to the list.!", {
      autoClose: 200, // Auto-close the toast after 5 seconds
      id: toastId,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(`${error.response.data.message}`, {
      autoClose: 200,
      id: toastId,
    });
  }
};

export default CreateDeliBatch;
