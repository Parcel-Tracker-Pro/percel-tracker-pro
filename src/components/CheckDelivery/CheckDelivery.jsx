import { CircleCheck, CircleX, MoveLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import getAllPercel from "../../api/percel/getAllPercel";
import Loading from "../Loading";
import { motion } from "framer-motion";
import noParcel from "../../assets/images/noparcel.svg";
import { format } from "date-fns";
import UpdateStatus from "../../api/percel/updateStatus";

function CheckDelivery() {
  const role = localStorage.getItem("parcelRole");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [parcels, setParcels] = useState([]);
  const [filteredParcels, setFilteredParcels] = useState([]);
  const [status, setStatus] = useState("On Deli");
  const navigate = useNavigate();

  const getPercels = async () => {
    setLoading(true);

    const response = await getAllPercel({ status: status });
    // console.log(response);
    if (response.code === 200) {
      if (role === "owner") {
        setParcels(response.data);
        setFilteredParcels(response.data);
      } else {
        setFilteredParcels([]);
      }

      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (search) {
      // setFilteredParcels(parcels);
      const filtered = parcels.filter((parcel) =>
        parcel.customerName.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredParcels(filtered);
    } else {
      setFilteredParcels(parcels);
    }
  };

  const updateParcelStatus = async (value, id) => {
    const data = {
      deliveryStatus: value,
      parcelUpdatedAt: format(new Date(), "yyyy-MM-dd"),
    };
    const res = await UpdateStatus(data, id);
    if (res.code === 200) {
      setShowCancel(false);
      getPercels();
      // console.log("work");
    }
  };

  useEffect(() => {
    handleSearch();
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getPercels();
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="bg-white py-5 gap-4 px-4">
        <div className="">
          <div className="flex gap-2 items-center">
            <MoveLeft
              className="mr-4 text-color cursor-pointer"
              size={23}
              onClick={() => navigate(-1)}
            />
            <p className="header-text">Delivery Parcel Lists</p>
          </div>

          <div className="w-full mt-5 flex border-2 border-[#CBD2E0] rounded-xl">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search by Customer Name"
              className="w-full py-3 outline-none rounded-xl px-5"
            />
            <button className="text-[#6B5201] py-3 px-5 rounded-xl focus:outline-none">
              <FaSearch />
            </button>
          </div>

          <div className="mt-5 flex justify-between">
            <button
              className={`text-color py-1 px-5 ${
                status === "On Deli" ? "border-b-2 border-[#6B5201]" : ""
              }`}
              onClick={() => setStatus("On Deli")}
            >
              On Delivery
            </button>
            <button
              className={`text-color py-1 px-5 ${
                status === "Success" ? "border-b-2 border-[#6B5201]" : ""
              }`}
              onClick={() => setStatus("Success")}
            >
              Success
            </button>
            <button
              className={`text-color py-1 px-5 ${
                status === "Cancel" ? "border-b-2 border-[#6B5201]" : ""
              }`}
              onClick={() => setStatus("Cancel")}
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

                    <div className="w-3/12 py-3 text-color text-center sm:text-left text-[13px] font-bold uppercase">
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

                    {status === "On Deli" && (
                      <div className="w-4/12 sm:w-3/12 py-3 text-color text-center text-[13px] uppercase font-bold">
                        <span className="me-3">Status</span>
                      </div>
                    )}
                  </div>

                  <div className="w-full bg-white h-[65vh] overflow-y-auto pb-20">
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
                              className={`w-3/12 text-center sm:text-left py-4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-900 ${
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
                              {format(parcel.batchCreatedAt, "dd/MM/yyyy")}
                            </div>

                            {status !== "On Deli" && (
                              <div
                                className={`w-4/12 sm:w-3/12 text-center py-4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-900 ${
                                  status === "Success" ? "line-through" : ""
                                }`}
                              >
                                {format(parcel?.ParcelUpdatedAt, "dd/MM/yyyy")}
                              </div>
                            )}

                            <div
                              className={`w-2/12 hidden sm:block py-4 text-center text-sm text-gray-900 ${
                                status === "Success" ? "line-through" : ""
                              }`}
                            >
                              <span className="me-3"> {parcel.price} Ks</span>
                            </div>

                            {status === "On Deli" && (
                              <div className="w-4/12 sm:w-3/12 py-4 flex justify-center">
                                <div className="flex gap-3">
                                  <button
                                    className="p-3 text-[#1C431E] bg-[#C5E2C6] rounded-lg focus:outline-none active:scale-105"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateParcelStatus("Success", parcel._id);
                                      // handleDelivery(parcel._id);
                                    }}
                                  >
                                    <CircleCheck />
                                  </button>

                                  <button
                                    className="p-3 text-[#601816] bg-[#F7C2C0] rounded-lg focus:outline-none active:scale-105"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateParcelStatus("Cancel", parcel._id);
                                    }}
                                  >
                                    <CircleX />
                                  </button>
                                </div>
                              </div>
                            )}
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

export default CheckDelivery;
