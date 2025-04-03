import axios from "../axios";
import { toast } from "sonner";

const getdeliveryreport = async ({ start, end }) => {
  // console.log(start, end);
  try {
    const response = await axios.get(
      `api/v1/delivery-report?startDate=${start}&endDate=${end}`
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
