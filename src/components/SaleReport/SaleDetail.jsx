import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getAllPercel from "../../api/percel/getAllPercel";
import Loading from "../Loading";
import { motion } from "framer-motion";
import noParcel from "../../assets/images/noparcel.svg";
import { format } from "date-fns";
import getsellersale from "../../api/sale/getsellersale";
// import UpdateStatus from "../../api/percel/updateStatus";

function SaleDetail() {
  const role = localStorage.getItem("parcelRole");
  const startDate = sessionStorage.getItem("startDate");
  const endDate = sessionStorage.getItem("endDate");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Success");
  const [filteredParcels, setFilteredParcels] = useState([]);
  const [successParcels, setSuccessParcels] = useState([]);
  const [cancelParcels, setCancelParcels] = useState([]);
  const navigate = useNavigate();

  // console.log(format(startDate, "yyyy-MM-dd"), format(endDate, "yyyy-MM-dd"));

  const getPercels = async () => {
    setLoading(true);

    const response = await getsellersale({
      start: format(startDate, "yyyy-MM-dd"),
      end: format(endDate, "yyyy-MM-dd"),
    });
    // console.log(response);
    if (response.code === 200) {
      if (role === "owner") {
        // setParcels(response.data);
        setSuccessParcels(response.data.detailedSuccessfulParcels);
        setCancelParcels(response.data.detailedCancelledParcels);
        setFilteredParcels(response.data.detailedSuccessfulParcels);
      } else {
        // setFilteredParcels([]);
        setSuccessParcels([]);
        setCancelParcels([]);
        setFilteredParcels([]);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    getPercels();
  }, []);

  return (
    <div>
      <div className="bg-white py-5 gap-4 px-4">
        <div className="">
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <MoveLeft
                className="mr-4 text-color cursor-pointer"
                size={23}
                onClick={() => navigate(-1)}
              />
              <p className="header-text">Sale Details</p>
            </div>
          </div>
          <div className="mt-5 flex justify-center gap-20">
            <button
              className={`text-color py-1 px-5 ${
                status === "Success" ? "border-b-2 border-[#6B5201]" : ""
              }`}
              onClick={() => {
                setStatus("Success");
                setFilteredParcels(successParcels);
              }}
            >
              Success
            </button>
            <button
              className={`text-color py-1 px-5 ${
                status === "Cancel" ? "border-b-2 border-[#6B5201]" : ""
              }`}
              onClick={() => {
                setStatus("Cancel");
                setFilteredParcels(cancelParcels);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div>
            {filteredParcels.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="rounded-2xl overflow-hidden mx-3">
                  <div className="flex w-full bg-white py-2 pb-4">
                    <div className="w-1/12 py-3 text-color text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                      <span className="ms-2">No</span>
                    </div>

                    <div className="w-7/12 py-3 text-color text-center sm:text-left text-[13px] font-bold uppercase">
                      Customer
                    </div>

                    <div className="w-4/12 sm:w-3/12 py-3  text-color text-center text-[13px] uppercase font-bold">
                      <span className="me-3">Delivery Date</span>
                    </div>

                    {status !== "On Deli" && (
                      <div className="w-4/12 sm:w-3/12 py-3 text-color text-center text-[13px] uppercase font-bold">
                        <span className="me-3">Update Date</span>
                      </div>
                    )}

                    <div className="w-2/12 hidden sm:block py-3 text-color text-center text-[13px] uppercase font-bold">
                      <span className="me-3">Price</span>
                    </div>

                    {/* {status === "On Deli" && (
                      <div className="w-4/12 sm:w-3/12 py-3 text-color text-center text-[13px] uppercase font-bold">
                        <span className="me-3">Status</span>
                      </div>
                    )} */}
                  </div>

                  <div className="w-full bg-white h-[75vh] overflow-y-auto pb-20">
                    {filteredParcels.length > 0 &&
                      filteredParcels.map((parcel, index) => (
                        <div key={index}>
                          <div
                            className={`w-full flex cursor-pointer items-center border-b border-gray-500 ${
                              status === "Success"
                                ? "bg-[#C5E2C6]"
                                : status === "Cancel"
                                ? "bg-[#F7C2C0]"
                                : "bg-white"
                            }`}
                            onClick={() =>
                              navigate(`/admin/detail/${parcel._id}`)
                            }
                          >
                            <div className="w-1/12 text-left py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className="ms-2"> {index + 1}</span>
                            </div>
                            <div
                              className={`w-7/12 text-center sm:text-left py-4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-900 ${
                                status === "Success" ? "line-through" : ""
                              }`}
                            >
                              {parcel.customerName}
                            </div>

                            <div
                              className={`w-4/12 sm:w-3/12 text-center py-4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-900 ${
                                status === "Success" ? "line-through" : ""
                              }`}
                            >
                              {format(parcel.parcelCreatedAt, "dd/MM/yyyy")}
                            </div>
                            <div
                              className={`w-2/12 hidden sm:block py-4 text-center text-sm text-gray-900 ${
                                parcel.deliveryStatus === "Success"
                                  ? "line-through"
                                  : ""
                              }`}
                            >
                              <span className="me-3"> {parcel.price} Ks</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center w-full h-[65vh]"
              >
                <img src={noParcel} alt="no parcel" />
                <h3 className="font-bold text-xl mb-2">No Parcels Yet</h3>
                <p className="text-gray-500">
                  Let’s add your first parcel to get started.
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SaleDetail;
