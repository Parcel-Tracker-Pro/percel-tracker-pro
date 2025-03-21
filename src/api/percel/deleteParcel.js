import axios from "../axios";
import { toast } from "sonner";

const deleteParcel = async (data) => {
  //   console.log(data);
  try {
    const response = await axios.delete(`api/v1/parcels/`, {
      data,
    });
    toast.success("Parcel deleted successfully!", {
      autoClose: 200, // Auto-close the toast after 5 seconds
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(`${error.response.data.message}`, {
      autoClose: 200,
    });
  }
};

export default deleteParcel;
