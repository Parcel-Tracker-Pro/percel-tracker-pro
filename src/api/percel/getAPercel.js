import axios from "../axios";
import { toast } from "sonner";

const getAPercel = async ({ id }) => {
  try {
    const response = await axios.get(`api/v1/parcel/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(`${error.response.data.message}`, {
      autoClose: 500,
    });
  }
};

export default getAPercel;
