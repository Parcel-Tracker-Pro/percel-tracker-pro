import axios from "../axios";
import { toast } from "sonner";

const CeateAParcel = async (data) => {
  //   console.log(data);
  try {
    const response = await axios.post(`api/v1/parcel`, data);
    toast.success("Parcel created successfully!", {
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

export default CeateAParcel;
