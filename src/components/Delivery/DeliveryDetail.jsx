import {
  CircleCheckBig,
  ClipboardCheck,
  Edit2Icon,
  EyeOff,
  MoveLeft,
  Search,
} from "lucide-react";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import { LuPackagePlus } from "react-icons/lu";
import getADelivery from "../../api/delivery/getADelivery";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import DeliStatusModel from "../Model/DeliStatusModel";
import Loading from "../Loading";

const DeliveryDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState([]);
  const [status, setStatus] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [filteredParcels, setFilteredParcels] = useState([]);
  const [selectedParcels, setSelectedParcels] = useState([]);
  const [edit, setEdit] = useState(false);

  const getDelivery = async (id) => {
    setLoading(true);
    const response = await getADelivery(id);
    console.log(response);
    if (response.code === 200) {
      setLoading(false);
      setStatus(response.data.status);
      setName(
        response.data.deliveryType +
          " " +
          formatTime(response.data.batchCreatedAt)
      );
      setDelivery(response.data.parcels);
      setFilteredParcels(response.data.parcels);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getUTCHours(); // Get hours in UTC
    const minutes = date.getUTCMinutes(); // Get minutes in UTC
    const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM/PM

    // Adjust hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")} ${ampm}`;

    return formattedTime;
  };

  //   console.log(filteredParcels);

  const selectAll = () => {
    if (selectedParcels.length === filteredParcels.length) {
      setSelectedParcels([]);
    } else {
      setSelectedParcels(filteredParcels.map((parcel) => parcel));
    }
  };

  //   console.log(filteredParcels);

  const searchParcels = (search) => {
    const response = delivery?.filter((parcel) =>
      parcel.customerName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredParcels(response);
    // console.log(response);
    // setFilteredParcels(response);
  };

  useEffect(() => {
    getDelivery(id);
  }, []);

  //   useEffect(() => {
  //     searchParcels();
  //   }, [search]);

  return (
    <div>
      {/* Header */}
      <div className="bg-white py-5 gap-4 px-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-2">
            <MoveLeft
              className="mr-4 text-color"
              size={23}
              onClick={() => navigate(-1)}
            />
            <p className="text-color ">{name}</p>
          </div>

          {status !== "On Deliver" && (
            <button className="button-color button">
              <EyeOff size={10} />
              <span className="text-[10px]">Hide Summary</span>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="border border-black w-20 justify-center py-1 flex items-center gap-1 rounded-full">
              <FaCalendarAlt size={10} />
              <p className="text-[10px]">
                1 Jan 2024
                {/* {format(item.batchCreatedAt, "dd.MM.yyyy")} */}
              </p>
            </div>

            <div className="border border-black w-20 justify-center py-1 flex items-center gap-1 rounded-full">
              <CiDeliveryTruck size={10} />
              <p className="text-[10px]">
                Normal
                {/* {item.deliveryType} */}
              </p>
              {/* <p className="text-[10px]">{item.deliveryType}</p> */}
            </div>

            <div className="border border-black w-10 justify-center py-1 flex items-center gap-1 rounded-full">
              <LuPackagePlus size={10} />
              <p className="text-[10px]">1{/* {item.parcelCount} */}</p>
              {/* <p className="text-[10px]">{item.parcelCount}</p> */}
            </div>
          </div>

          {/* {status !== "On Deliver" && !edit && (
            <button
              className="button-color button"
              onClick={() => setEdit(!edit)}
            >
              <Edit2Icon size={23} />
              <span>Edit</span>
            </button>
          )} */}
        </div>
      </div>

      {/* Summary */}
      <div className="px-4 mt-5 flex items-center justify-between">
        <p className="header-text">Parcel</p>

        <div className="flex items-center gap-2 bg-white py-2 px-3 rounded-full border border-gray-300">
          <input
            type="text"
            placeholder="Search Parcel"
            className="w-full bg-white outline-none"
            onChange={(e) => searchParcels(e.target.value)}
          />
          <button className="">
            <Search size={23} className="text-color" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="pt-6">
        {loading && (
          <div>
            <Loading />
          </div>
        )}
        {/* ____________________________________________ */}
        {filteredParcels.length > 0 && !loading && (
          <div className="w-screen">
            <div className="rounded-2xl overflow-hidden mx-3">
              <div className="flex w-full bg-white py-2 pb-4">
                <div className="w-2/12 py-3 text-center text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    checked={
                      selectedParcels.length === filteredParcels.length &&
                      selectedParcels.length > 0
                    }
                    type="checkbox"
                    className="h-4 w-4"
                    onChange={selectAll}
                  />
                </div>

                <div className="w-2/12 py-3 text-color text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                  <span className="ms-2">No</span>
                </div>

                <div className="w-5/12 py-3 text-color text-left text-[13px] font-bold text-gray-500 uppercase">
                  Customer
                </div>

                <div className="w-3/12 py-3 text-color text-center text-[13px] uppercase font-bold">
                  <span className="me-3">Price</span>
                </div>
              </div>

              <div className="w-full bg-white h-[65vh] overflow-y-auto pb-20">
                {filteredParcels.length > 0 &&
                  filteredParcels.map((parcel, index) => (
                    <div key={index}>
                      <div
                        className={`w-full flex cursor-pointer items-center border-b border-gray-500 ${
                          selectedParcels.includes(parcel) ||
                          parcel.deliveryStatus === "Success"
                            ? "bg-[#C5E2C6]"
                            : parcel.deliveryStatus === "Cancel" &&
                              !selectedParcels.includes(parcel)
                            ? "bg-[#F7C2C0]"
                            : "bg-white"
                        }`}
                        onClick={() => navigate(`/admin/detail/${parcel._id}`)}
                      >
                        <div
                          className="w-2/12 py-3 text-center text-[13px] font-medium text-gray-500"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            checked={selectedParcels.includes(parcel)}
                            onChange={(e) =>
                              setSelectedParcels(
                                e.target.checked
                                  ? [...selectedParcels, parcel]
                                  : selectedParcels.filter(
                                      (p) => p._id !== parcel._id
                                    )
                              )
                            }
                          />
                        </div>
                        <div className="w-2/12 text-left py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="ms-2"> {index + 1}</span>
                        </div>
                        <div
                          className={`w-5/12 text-left py-4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-900 ${
                            selectedParcels.includes(parcel) ||
                            parcel.deliveryStatus === "Success"
                              ? "line-through"
                              : ""
                          }`}
                        >
                          {parcel.customerName}
                        </div>

                        <div
                          className={`w-3/12 py-4 text-center text-sm text-gray-900 ${
                            selectedParcels.includes(parcel) ||
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
          </div>
        )}
      </div>

      {status === "On Deliver" && (
        <div className="bg-white border border-gray-200 shadow-md p-5 rounded-xl fixed bottom-0 w-full">
          <button
            onClick={() => setShowSummary(true)}
            className={`bg-green-900 flex items-center justify-center gap-4 text-white px-4 py-3 rounded w-full active:scale-95 ${
              selectedParcels.length === 0 && "opacity-50 cursor-not-allowed"
            }`}
            disabled={selectedParcels.length === 0}
          >
            <ClipboardCheck size={20} />
            Confirm Delivery
          </button>
        </div>
      )}

      {status === "Finished" && edit && (
        <div className=" flex gap-4 bg-white border border-gray-200 shadow-md p-5 rounded-xl fixed bottom-0 w-full">
          <button onClick={() => setEdit(false)}>
            {/* <ClipboardCheck size={20} /> */}
            Discard
          </button>
          <button
            onClick={() => setShowSummary(true)}
            className={`bg-primary   flex items-center justify-center gap-4 text-white px-4 py-3 rounded w-full active:scale-95 `}
            // disabled={selectedParcels.length === 0}
          >
            Confirm Edit
            <CircleCheckBig />
          </button>
        </div>
      )}

      <DeliStatusModel
        totalParcels={delivery.length}
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        selectedParcels={selectedParcels}
        id={id}
      />
    </div>
  );
};

export default DeliveryDetail;
