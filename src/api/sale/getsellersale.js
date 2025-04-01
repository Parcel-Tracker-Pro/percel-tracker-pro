import axios from "../axios";
import { toast } from "sonner";

const getsellersale = async ({ start, end }) => {
  // console.log(month, year);
  try {
    const response = await axios.get(
      `api/v1/sales-report?startDate=${start}&endDate=${end}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(`${error.response.data.message}`, {
      autoClose: 500,
    });
  }
};

export default getsellersale;
