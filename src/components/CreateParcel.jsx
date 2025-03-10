import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";

const CreateParcel = () => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [price, setPrice] = useState("");
  const [DeliFee, setDeliFee] = useState("");
  const [showErr, setShowErr] = useState(false);

  const addParcel = () => {
    if (
      !customerName ||
      !phone ||
      !items ||
      !paymentMethod ||
      !price ||
      !DeliFee
    ) {
      setShowErr(true);
    }
  };

  return (
    <div className="bg-gray-300 min-h-screen">
      {/* Header */}
      <div className="flex bg-white items-center justify-between mb-6 gap-4 px-2 pb-2">
        <p className="text-2xl font-bold">Add Parcel</p>
        <button
          // onClick={() => setShowDatePicker(!showDatePicker)}
          className="bg-primary flex items-center gap-2 text-white font-medium rounded-full px-4 py-3"
        >
          <p className="font-bold">Sell By Admin</p>
        </button>
      </div>
      <div className="mx-3 bg-white p-6 rounded-lg space-y-5">
        <div className="space-y-3">
          <label className="font-bold text-lg">Customer Name</label>
          <div
            className={`flex items-center w-full px-4 py-3 border-2 rounded-lg ${
              !customerName && showErr ? "border-red-500" : "border-gray-300"
            }`}
          >
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full focus:outline-none"
              placeholder="Enter Customer Name"
            />
            <FaRegCopy />
          </div>
        </div>
        <div className="space-y-3">
          <label className="font-bold text-lg">Phone Number</label>
          <div
            className={`flex items-center w-full px-4 py-3 border-2 rounded-lg ${
              !phone && showErr ? "border-red-500" : "border-gray-300"
            }`}
          >
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full focus:outline-none"
              placeholder="Enter Phone Number"
            />
            <FaRegCopy />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="space-y-3">
            <label className="font-bold text-lg">Items</label>
            <div
              className={`flex items-center w-full px-4 py-3 border-2 rounded-lg ${
                !items && showErr ? "border-red-500" : "border-gray-300"
              }`}
            >
              <input
                value={items}
                onChange={(e) => setItems(e.target.value)}
                type="text"
                className="w-full focus:outline-none"
                placeholder="Enter Total Items"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="font-bold text-lg">Payment Status</label>
            <div
              className={`flex items-center w-full px-4 py-3 border-2 rounded-lg ${
                !paymentMethod && showErr ? "border-red-500" : "border-gray-300"
              }`}
            >
              <select
                className="w-full focus:outline-none"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="" disabled>
                  Select Payment Status
                </option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="pending">Pending</option>
                <option value="due">COD</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="space-y-3">
            <label className="font-bold text-lg">Parcel</label>
            <div
              className={`flex items-center w-full px-4 py-3 border-2 rounded-lg ${
                !price && showErr ? "border-red-500" : "border-gray-300"
              }`}
            >
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full focus:outline-none"
                placeholder="Parcel Price"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="font-bold text-lg">Delivery Fees</label>
            <div
              className={`flex items-center w-full px-4 py-3 border-2 rounded-lg ${
                !DeliFee && showErr ? "border-red-500" : "border-gray-300"
              }`}
            >
              <input
                type="text"
                value={DeliFee}
                onChange={(e) => setDeliFee(e.target.value)}
                className="w-full focus:outline-none"
                placeholder="Delivery Fees"
              />
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              addParcel();
            }}
            className={`${
              !customerName ||
              !phone ||
              !items ||
              !paymentMethod ||
              !price ||
              !DeliFee
                ? "bg-primary/50"
                : "bg-primary"
            } justify-center w-full flex items-center gap-2 text-white font-medium rounded-xl px-4 py-3`}
          >
            Add Parcel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateParcel;
