import axios from "../axios";
import { toast } from "sonner";

const SearchFilterParcel = async (name) => {
  try {
    const response = await axios.get(`api/v1/parcels/search?query=${name}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(`${error.response.data.message}`, {
      autoClose: 500,
    });
  }
};

export default SearchFilterParcel;
