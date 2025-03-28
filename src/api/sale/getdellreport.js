import axios from "../axios";
import { toast } from "sonner";

const getdeliveryreport = async (month, year) => {
  // console.log(month, year);
  try {
    const response = await axios.get(
      `api/v1/delivery-report?month=${month}&year=${year}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(`${error.response.data.message}`, {
      autoClose: 500,
    });
  }
};

export default getdeliveryreport;
