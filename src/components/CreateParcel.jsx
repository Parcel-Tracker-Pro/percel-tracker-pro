import { FaRegCopy } from "react-icons/fa";

const CreateParcel = () => {
  return (
    <div className="bg-gray-300 min-h-screen">
      {/* Header */}
      <div className="flex bg-white items-center justify-between mb-6 gap-4 px-2 pb-2">
        <p className="text-2xl font-bold">Add Parcel</p>
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="bg-white flex items-center gap-2 bg-primary font-medium rounded-full px-4 py-3"
        >
          <p className="font-bold">Sell By Admin</p>
        </button>
      </div>
      <div className="mx-3 bg-white p-6 rounded-lg space-y-5">
        <div className="space-y-3">
          <label className="font-bold text-lg">Customer Name</label>
          <div className="flex items-center w-full px-4 py-3 border-2 border-gray-300 rounded-lg">
            <input
              type="text"
              className="w-full focus:outline-none"
              placeholder="Enter Customer Name"
            />
            <FaRegCopy />
          </div>
        </div>
        <div className="space-y-3">
          <label className="font-bold text-lg">Phone Number</label>
          <div className="flex items-center w-full px-4 py-3 border-2 border-gray-300 rounded-lg">
            <input
              type="text"
              className="w-full focus:outline-none"
              placeholder="Enter Phone Number"
            />
            <FaRegCopy />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="space-y-3">
            <label className="font-bold text-lg">Items</label>
            <div className="flex items-center w-full px-4 py-3 border-2 border-gray-300 rounded-lg">
              <input
                type="text"
                className="w-full focus:outline-none"
                placeholder="Enter Total Items"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="font-bold text-lg">Payment Status</label>
            <div className="flex items-center w-full px-4 py-3 border-2 border-gray-300 rounded-lg">
              <select className="w-full focus:outline-none">
                <option value="">Select Payment Status</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateParcel;
