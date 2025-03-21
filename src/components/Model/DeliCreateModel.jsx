import { motion } from "framer-motion";
import deletesvg from "./../../assets/images/delete.svg";
import { Trash } from "lucide-react";
import { useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import CreateDeliBatch from "../../api/delivery/CreateDeliBatch";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const DeliCreateModel = ({ isOpen, onClose, selectedParcels }) => {
  const today = new Date().toLocaleString("en-US", { timeZone: "Asia/Yangon" });
  // console.log("today", today);

  // console.log(format(today, "yyyy-MM-dd"));
  const navigate = useNavigate();
  const totalPrice = selectedParcels.reduce(
    (accumulator, item) => accumulator + item.price,
    0
  );
  const totalDeliFee = selectedParcels.reduce(
    (accumulator, item) => accumulator + item.deliveryFee,
    0
  );
  // console.log(totalDeliFee);
  const [showDeliService, setShowDeliService] = useState(false);
  const [deliService, setDeliService] = useState("Ninja Van");

  const handleSubmit = async () => {
    const data = {
      parcelIds: selectedParcels.map((parcel) => parcel._id),
      deliveryType: deliService,
      batchCreatedAt: today,
    };
    // console.log(data);
    const response = await CreateDeliBatch(data);
    // console.log(response);
    if (response.code === 201) {
      navigate("/admin/delivery");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <motion.div className="border border-gray-300 shadow-lg px-8 py-5 rounded-md bg-white max-w-sm mx-auto">
        <div className="">
          <p className="text-2xl mb-5">Create Delivery</p>
          <div className="space-y-3 w-full relative">
            <label className="font-bold text-lg">Delivery Service</label>
            <div
              onClick={() => setShowDeliService(!showDeliService)}
              className={`flex items-center justify-between w-full px-2 py-3 overflow-hidden border-2 rounded-lg border-gray-500`}
            >
              <p className="truncate w-24 text-gray-500">
                {deliService || "Select DeliService"}
              </p>
              <BiDownArrow size={25} />
            </div>
            {showDeliService && (
              <div className="absolute w-full top-[80px] right-0 bg-white border border-gray-300 rounded-t rounded-xl shadow-sm">
                <div className="text-center">
                  <p
                    className="truncate p-2 border-b border-gray-200"
                    onClick={() => {
                      setDeliService("Ninja Van");
                      setShowDeliService(false);
                    }}
                  >
                    Ninja Van
                  </p>
                  <p
                    className="truncate p-2 border-b border-gray-200"
                    onClick={() => {
                      setDeliService("Express");
                      setShowDeliService(false);
                    }}
                  >
                    Express
                  </p>
                  <p
                    className="truncate p-2 border-b border-gray-200"
                    onClick={() => {
                      setDeliService("Own Delivery");
                      setShowDeliService(false);
                    }}
                  >
                    Own Delivery
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="p-5 border border-gray-400 mt-5 rounded-xl">
            <p className="header-text text-center mb-6">Delivery Summary</p>
            <div className="space-y-5">
              <div>
                <p className="text-gray-600 font-medium">Total Parcel</p>
                <p className="text-xl font-bold">{selectedParcels.length}</p>
              </div>

              <div>
                <p className="text-gray-600 font-medium">Price</p>
                <p className="text-xl font-bold">
                  {totalPrice.toLocaleString()} MMK
                </p>
              </div>

              <div>
                <p className="text-gray-600 font-medium">Delivery Fee</p>
                <p className="text-xl font-bold">
                  {totalDeliFee.toLocaleString()} MMK
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 md:gap-10 mt-4 ">
            <button
              onClick={onClose}
              className="border border-gray-300 rounded-md p-4 text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex gap-4 font-bold rounded-md p-4 bg-[#BADEFB] text-[#0E3F66] hover:scale-105 active:scale-95"
            >
              Deliver Parcel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeliCreateModel;
