import { MoveLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SearchFilterParcel from "../../api/percel/SearclParcel";
import { useNavigate } from "react-router-dom";

function SearchParcel() {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [matchedParcels, setMatchedParcels] = useState({});
  const [cusname, setCusname] = useState("");

  //   const data = [
  //     {
  //       _id: "67cfc7bc3ce5bacd3465b334",
  //       customerName: "Baung",
  //       address: "no.12345",
  //       price: 5000,
  //       seller: "Mi Mi - 1",
  //       paymentStatus: "COD",
  //       deliveryType: null,
  //       deliveryStatus: "Pending",
  //       deliveryFee: 3500,
  //       createdAt: "2025-02-17T00:00:00.000Z",
  //       updatedAt: null,
  //       __v: 0,
  //     },
  //     {
  //       _id: "67cfc7cd3ce5bacd3465b337",
  //       customerName: "Baung",
  //       address: "no.12345",
  //       price: 5000,
  //       seller: "Mi Mi - 1",
  //       paymentStatus: "COD",
  //       deliveryType: null,
  //       deliveryStatus: "Pending",
  //       deliveryFee: 3500,
  //       createdAt: "2025-02-17T00:00:00.000Z",
  //       updatedAt: null,
  //       __v: 0,
  //     },
  //     {
  //       _id: "67d0124e9823d884ead68966",
  //       customerName:
  //         "Baungfdnfjnfjfnkanflnlknfklnfklnlsfnlnglg l glsg gl nslkfngklgkgnlskgn",
  //       address: "no.12345",
  //       price: 5000,
  //       seller: "Mi Mi - 1",
  //       paymentStatus: "COD",
  //       deliveryType: null,
  //       deliveryStatus: "Pending",
  //       deliveryFee: 3500,
  //       createdAt: "2025-03-11T00:00:00.000Z",
  //       updatedAt: null,
  //       __v: 0,
  //     },
  //     {
  //       _id: "67d012549823d884ead68968",
  //       customerName:
  //         "Baungfdnfjnfjfnkanflnlknfklnfklnlsfnlnglg l glsg gl nslkfngklgkgnlskgn",
  //       address: "no.12345",
  //       price: 5000,
  //       seller: "Mi Mi - 1",
  //       paymentStatus: "COD",
  //       deliveryType: null,
  //       deliveryStatus: "Pending",
  //       deliveryFee: 3500,
  //       createdAt: "2025-03-11T00:00:00.000Z",
  //       updatedAt: null,
  //       __v: 0,
  //     },
  //   ];

  const filterMatchedParcels = async (name) => {
    // console.log(data);
    const res = await SearchFilterParcel(name);
    setParcels(res);
    if (res.code === 200) {
      console.log("data", res.data);
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

  //   console.log(matchedParcels);

  return (
    <div>
      <div className="bg-white mb-6 px-4 py-5">
        <div className="flex items-center">
          <MoveLeft className="mr-4" size={23} onClick={() => navigate(-1)} />
          <div>
            <p className="header-text">Search Parcel</p>
          </div>
        </div>

        <div className="w-full mt-5">
          <div
            className="flex bg-white items-center border border-gray-500 rounded-2xl p-5"
            onClick={() => navigate("search")}
          >
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

      <div className="mb-6 px-4 py-5">
        <h2 className="text-color text-lg font-semibold mb-5">
          Matched Parcels
        </h2>
        {Object.keys(matchedParcels).map((date) => (
          <div key={date} className="mb-4">
            <h3 className="text-color text-md font-semibold mb-5">{date}</h3>
            {matchedParcels[date].map((parcel, index) => (
              <div key={index}>
                <div
                  className="w-full bg-white py-2 px-5 mb-5 flex hover:bg-gray-50 cursor-pointer items-center rounded-xl shadow-md"
                  onClick={() => navigate(`detail/${parcel._id}`)}
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
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchParcel;
