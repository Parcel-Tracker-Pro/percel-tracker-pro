import { CiDeliveryTruck } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import { ReceiptText } from "lucide-react";
import { Truck } from "lucide-react";
import { FileCheck } from "lucide-react";
import { LuPackagePlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import getAllDelivery from "../../api/delivery/getAllDelivery";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Delivery = () => {
  const navigate = useNavigate();
  const [delilist, setDeliList] = useState([]);
  const [filterDeliList, setFilterDelilist] = useState([]);
  const [filter, setFilter] = useState("All");

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

  const getDeliveryList = async () => {
    const res = await getAllDelivery();
    if (res.code === 200) {
      setDeliList(res.data);
    }
  };

  const filterDeliver = (status) => {
    if (status === "All") {
      setFilterDelilist(delilist);
    } else {
      const filtered = delilist.filter((deli) => deli.status === status);
      setFilterDelilist(filtered);
    }
  };

  useEffect(() => {
    getDeliveryList();
  }, []);

  useEffect(() => {
    filterDeliver(filter);
  }, [filter, delilist]);

  // console.log("filter", filterDeliList);

  return (
    <div className="px-2 py-5 pb-20">
      <div className="flex items-center justify-between mb-10">
        <p className="header-text">Delivery List</p>
        <button
          // onClick=(()=>navigate)
          onClick={() => navigate("/admin/createdelivery")}
          className="button bg-primary"
        >
          <FaCalendarAlt className="" />
          <p className="font-medium">Create Deliverys</p>
        </button>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <button
          className={`transition all duration-300 active:scale-95 border border-black px-4 justify-center py-1 flex items-center gap-1 rounded-full ${
            filter === "All" ? "button-color" : ""
          }`}
          onClick={() => setFilter("All")}
        >
          <ReceiptText size={10} />
          <p className="text-[10px]">All</p>
        </button>

        <button
          className={`transition all duration-300 active:scale-95 border border-black px-4 justify-center py-1 flex items-center gap-1 rounded-full ${
            filter === "On Deliver" ? "button-color" : ""
          }`}
          onClick={() => setFilter("On Deliver")}
        >
          <ReceiptText size={10} />
          <p className="text-[10px]">Delivering</p>
        </button>

        <div
          className={`transition all cursor-pointer duration-300 active:scale-95 border border-black px-4 justify-center py-1 flex items-center gap-1 rounded-full ${
            filter === "Finished" ? "button-color" : ""
          }`}
          onClick={() => setFilter("Finished")}
        >
          <ReceiptText size={10} />
          <p className="text-[10px]">Finished</p>
        </div>
      </div>

      {filterDeliList.length > 0 ? (
        <div className="space-y-4">
          {filterDeliList.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/admin/deliverydetail/${item._id}`)}
              className="flex p-3 bg-white mx-2 rounded-lg items-center justify-between"
            >
              <div>
                <p className="mb-3">{item.batchName}</p>
                <div className="flex items-center gap-2">
                  <div className="border border-black w-20 justify-center py-1 flex items-center gap-1 rounded-full">
                    <FaCalendarAlt size={10} />
                    <p className="text-[10px]">
                      {format(item.batchCreatedAt, "dd.MM.yyyy")}
                    </p>
                  </div>

                  <div className="border border-black w-24 justify-center py-1 flex items-center gap-1 rounded-full">
                    <CiDeliveryTruck size={10} />
                    <p className="text-[10px]">{item.deliveryType}</p>
                  </div>

                  <div className="border border-black w-10 justify-center py-1 flex items-center gap-1 rounded-full">
                    <LuPackagePlus size={10} />
                    <p className="text-[10px]">{item.parcelCount}</p>
                  </div>
                </div>
              </div>

              <div>
                {item.status === "Finished" ? (
                  <button className=" flex flex-col rounded-lg items-center gap-1 bg-green-200 w-24 py-3 text-green-900">
                    <FileCheck size={15} />
                    <p className="text-[14px] font-bold">Finsihed </p>
                  </button>
                ) : (
                  <button className=" flex flex-col rounded-lg items-center gap-1 bg-blue-200 w-24 py-3 text-blue-900">
                    <Truck size={15} />
                    <p className="text-[14px] font-bold">Delivering</p>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Delivery;
