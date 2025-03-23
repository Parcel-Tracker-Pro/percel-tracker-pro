import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import changeStatus from "../../api/delivery/changeStatus";
import { format } from "date-fns";

const DeliStatusModel = ({
  isOpen,
  onClose,
  selectedParcels,
  totalParcels,
  id,
}) => {
  const navigate = useNavigate();
  const date = format(new Date(), "yyyy-MM-dd");
  const totalPrice = selectedParcels.reduce(
    (accumulator, item) => accumulator + item.price,
    0
  );
  const totalDeliFee = selectedParcels.reduce(
    (accumulator, item) => accumulator + item.deliveryFee,
    0
  );

  const handleSubmit = async () => {
    const data = {
      successParcelIds: selectedParcels.map((parcel) => parcel._id),
      timestamps: date,
    };
    const response = await changeStatus({ data, id });
    if (response.code === 200) {
      navigate("/admin/delivery");
    }
  };

  if (!isOpen) return null;

  // Define animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <motion.div
        className="border border-gray-300 shadow-lg px-8 py-5 rounded-md bg-white max-w-sm mx-auto"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        <div className="">
          <p className="text-2xl mb-5">Check Nanja Van 12:30PM Delivery</p>

          <div className="p-5 border border-gray-400 mt-5 rounded-xl">
            <p className="header-text text-center mb-6">Delivery Summary</p>
            <div className="space-y-5">
              <div>
                <p className="text-gray-600 font-medium">Total Parcel</p>
                <p className="text-xl font-bold">{totalParcels}</p>
              </div>

              <div>
                <p className="text-gray-600 font-medium">Selected Parcel</p>
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
          <div className="flex justify-between mt-4 ">
            <button onClick={onClose} className="rounded-md p-4 text-gray-700">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex gap-4 font-bold rounded-md py-4 px-10 bg-[#C5E2C6] text-[#1C431E] hover:scale-105 active:scale-95"
            >
              Deliver Parcel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeliStatusModel;
