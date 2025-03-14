import axios from "../axios";
import { toast } from "sonner";

const getsellersale = async (month, year) => {
  console.log(month, year);
  try {
    const response = await axios.get(
      `api/v1/sales-report?month=${month}&year=${year}`
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
