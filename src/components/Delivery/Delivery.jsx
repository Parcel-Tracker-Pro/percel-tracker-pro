import { CiDeliveryTruck } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Truck } from "lucide-react";
import { FileCheck } from "lucide-react";
import { LuPackagePlus } from "react-icons/lu";

const deliveryList = [
  {
    id: 1,
    name: "Delivery bar",
    delivery: "Ninja Van",
    status: "Pending",
    date: "12-1-25",
    items: 27,
  },
  {
    id: 2,
    name: "Delivery bar",
    delivery: "Ninja Van",
    status: "Active",
    date: "12-1-25",
    items: 27,
  },
  {
    id: 3,
    name: "Delivery bar",
    delivery: "Ninja Van",
    status: "Finished",
    date: "12-1-25",
    items: 27,
  },
];

const Delivery = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex bg-white py-5 items-center justify-between mb-6 gap-4 px-2">
        <div className="flex bg-white items-center border border-gray-500 rounded-full px-4 py-3">
          <input
            type="text"
            placeholder="Search Parcel"
            className="focus:outline-none w-full"
          />
          <FaMagnifyingGlass className="text-gray-500" />
        </div>
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="bg-primary flex items-center gap-2 bg-primary font-medium rounded-full px-4 py-3"
        >
          <FaCalendarAlt className="text-white" />
          <p className="font-medium text-white">10.3.2023</p>
        </button>
      </div>

      <div className="px-2">
        <div className="flex items-center justify-between mb-5">
          <p className="font-bold text-xl">Delivery List</p>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="bg-primary flex items-center gap-2 bg-primary font-medium rounded-full px-4 py-3"
          >
            <FaCalendarAlt className="" />
            <p className="font-medium">Create Deliverys</p>
          </button>
        </div>

        <div className="space-y-4">
          {deliveryList.map((item) => (
            <div className="flex p-3 bg-white mx-2 rounded-lg items-center justify-between">
              <div>
                <p className="mb-3 font-bold text-base">{item.name}</p>
                <div className="flex items-center gap-2">
                  <div className="border border-black w-20 justify-center py-1 flex items-center gap-1 rounded-full">
                    <FaCalendarAlt size={10} />
                    <p className="text-[10px]">{item.date}</p>
                  </div>

                  <div className="border border-black w-20 justify-center py-1 flex items-center gap-1 rounded-full">
                    <CiDeliveryTruck size={10} />
                    <p className="text-[10px]">Ninja Van</p>
                  </div>

                  <div className="border border-black w-10 justify-center py-1 flex items-center gap-1 rounded-full">
                    <LuPackagePlus size={10} />
                    <p className="text-[10px]">79</p>
                  </div>
                </div>
              </div>

              <div>
                {item.status === "Finished" ? (
                  <button className=" flex flex-col rounded-lg items-center gap-1 bg-green-200 w-24 py-3">
                    <FileCheck size={15} />
                    <p className="text-[14px]">Finsihed </p>
                  </button>
                ) : (
                  <button className=" flex flex-col rounded-lg items-center gap-1 bg-yellow-200 w-24 py-3">
                    <Truck size={15} />
                    <p className="text-[14px]">Delivering</p>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Delivery;
