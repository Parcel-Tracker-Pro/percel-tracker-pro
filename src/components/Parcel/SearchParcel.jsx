import { MoveLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SearchFilterParcel from "../../api/percel/SearclParcel";
import { useNavigate } from "react-router-dom";
import noSearch from "./../../assets/images/nosearch.svg";
import { motion, AnimatePresence } from "framer-motion"; // Import from framer-motion

function SearchParcel() {
  const navigate = useNavigate();
  const [matchedParcels, setMatchedParcels] = useState({});
  const [cusname, setCusname] = useState("");

  const filterMatchedParcels = async (name) => {
    sessionStorage.setItem("search", name);
    const res = await SearchFilterParcel(name);
    if (res.code === 200) {
      const data = res.data;
      // Group parcels by date
      const groupedParcels = data.reduce((acc, parcel) => {
        const date = new Date(parcel.createdAt).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(parcel);
        return acc;
      }, {});

      setMatchedParcels(groupedParcels);
    }
  };

  useEffect(() => {
    const name = sessionStorage.getItem("search") || "";
    if (name) {
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
              onChange={(e) => setCusname(e.target.value)}
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

      {matchedParcels.length > 0 ? (
        <div className="mb-6 px-4 py-5">
          <h2 className="text-color text-lg font-semibold mb-10">
            <span className="button-color rounded-full py-2 px-4 mr-3">
              {Object.keys(matchedParcels).length}
            </span>{" "}
            Matched Parcels
          </h2>
          <AnimatePresence>
            {Object.keys(matchedParcels).map((date) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <h3 className="text-color text-md font-semibold mb-5">
                  {date}
                </h3>
                {matchedParcels[date].map((parcel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div
                      className="w-full bg-white py-2 px-5 mb-5 flex hover:bg-gray-50 cursor-pointer items-center rounded-xl shadow-md"
                      onClick={() => navigate(`/admin/detail/${parcel._id}`)}
                    >
                      <div className="w-2/12 text-left py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="ms-2"> {index + 1}</span>
                      </div>
                      <div className="w-5/12 text-left py-4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-900">
                        {parcel.customerName}
                      </div>
                      <div className="w-5/12 py-4 text-end text-sm text-gray-900">
                        <span className="me-3"> {parcel.price} Ks</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col justify-center h-[60vh] items-center">
          <img src={noSearch} alt="no search" />
          <p className="text-gray500 text-center">
            Search the parcel with <br /> customer name & phone <br /> number.
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchParcel;
