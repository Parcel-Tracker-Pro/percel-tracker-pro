import { MoveLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SearchFilterParcel from "../../api/percel/SearclParcel";
import { useNavigate } from "react-router-dom";
import noSearch from "./../../assets/images/nosearch.svg";
import { motion } from "framer-motion"; // Import from framer-motion
import { format } from "date-fns";
import Loading from "../Loading";

function SearchParcel() {
  const navigate = useNavigate();
  const [matchedParcels, setMatchedParcels] = useState([]);
  const [cusname, setCusname] = useState("");
  const [loading, setLoading] = useState(false);
  // console.log("cus", cusname);

  const filterMatchedParcels = async (name) => {
    setLoading(true);
    sessionStorage.setItem("search", name);
    const res = await SearchFilterParcel(name);
    if (res.code === 200) {
      setLoading(false);
      const data = res.data;
      // console.log("data", data);
      setMatchedParcels(data);
      // Group parcels by date
      // const groupedParcels = data.reduce((acc, parcel) => {
      //   const date = new Date(parcel.createdAt).toLocaleDateString();
      //   if (!acc[date]) {
      //     acc[date] = [];
      //   }
      //   acc[date].push(parcel);
      //   return acc;
      // }, {});

      // setMatchedParcels(groupedParcels);
    }
  };

  useEffect(() => {
    const name = sessionStorage.getItem("search") || "";
    if (name) {
      setCusname(name);
      filterMatchedParcels(name);
    }
  }, []);

  return (
    <div>
      <div className="bg-white px-4 pt-5 pb-8">
        <div className="flex items-center">
          <MoveLeft
            className="mr-4"
            size={23}
            onClick={() => {
              navigate(-1);
              sessionStorage.removeItem("search");
            }}
          />
          <div>
            <p className="header-text">Search Parcel</p>
          </div>
        </div>

        <div className="w-full mt-6">
          <div className="flex bg-white items-center border border-gray-500 rounded-2xl p-5">
            <input
              value={cusname}
              type="text"
              onChange={(e) => {
                setCusname(e.target.value);
                if (e.target.value === "") {
                  setMatchedParcels([]);
                }
              }}
              className="w-full border-none outline-none"
              placeholder="Search parcel by customer name"
            />
            <button
              className="button-color p-3 rounded-full shadow-sm active:scale-90"
              onClick={() => filterMatchedParcels(cusname)}
            >
              <FaMagnifyingGlass className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {cusname !== "" ? (
        loading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Loading />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 py-5"
          >
            <h2 className="text-color text-lg font-semibold mb-10 ms-5 mt-5">
              <span className="button-color rounded-full py-2 px-4 mr-3">
                {matchedParcels.length}
              </span>{" "}
              Matched Parcels
            </h2>
            <div className="w-full">
              <div className="rounded-2xl overflow-hidden mx-3">
                <div className="flex w-full bg-white py-2 pb-4">
                  <div className="w-2/12 py-3 text-color text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                    <span className="ms-2">No</span>
                  </div>

                  <div className="w-4/12 py-3 text-color text-left text-[13px] font-bold text-gray-500 uppercase">
                    Customer
                  </div>

                  <div className="w-3/12 py-3 text-color text-center text-[13px] uppercase font-bold">
                    <span className="me-3">Price</span>
                  </div>

                  <div className="w-3/12 py-3 text-color text-center text-[13px] uppercase font-bold">
                    <span className="me-3">Date</span>
                  </div>
                </div>

                <div className="w-full h-[500px] bg-white overflow-y-auto pb-20">
                  {matchedParcels.length > 0 &&
                    matchedParcels.map((parcel, index) => (
                      <div key={index}>
                        <div
                          className="w-full bg-white flex hover:bg-gray-50 cursor-pointer items-center border-b border-gray-500"
                          onClick={() =>
                            navigate(`/admin/detail/${parcel._id}`)
                          }
                        >
                          <div className="w-2/12 text-left py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="ms-2"> {index + 1}</span>
                          </div>
                          <div className="w-4/12 text-left py-4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-900">
                            {parcel.customerName}
                          </div>

                          <div className="w-3/12 py-4 text-center text-sm text-gray-900">
                            <span className="me-3"> {parcel.price} Ks</span>
                          </div>

                          <div className="w-3/12 py-4 text-center text-sm text-gray-900">
                            <span className="me-3">
                              {format(parcel.parcelCreatedAt, "dd/MMMM")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center h-[60vh] items-center"
        >
          <img src={noSearch} alt="no search" />
          <p className="text-gray500 text-center">
            Search the parcel with <br /> customer name & phone <br /> number.
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default SearchParcel;
