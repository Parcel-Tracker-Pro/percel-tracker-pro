import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import CeateAParcel from "../../api/percel/CreateParcle";
import { format } from "date-fns";
import { BiDownArrow } from "react-icons/bi";

const CreateParcel = () => {
  const today = new Date();
  const username = localStorage.getItem("percelUsername");
  // console.log(username);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [price, setPrice] = useState("");
  const [DeliFee, setDeliFee] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [seller, setSeller] = useState(username);
  const [showSeller, setShowSeller] = useState(false);

  const addParcel = async () => {
    if (
      !customerName ||
      !phone ||
      !items ||
      !paymentMethod ||
      !price ||
      !DeliFee
    ) {
      setShowErr(true);
      return;
    }

    const data = {
      customerName,
      address: phone,
      paymentStatus: paymentMethod,
      price: price * 1,
      deliveryFee: DeliFee * 1,
      seller: username,
      createdAt: format(today, "yyyy-MM-dd"),
    };
    // console.log(data);
    const res = await CeateAParcel(data);
    if (res.code === 201) {
      setCustomerName("");
      setPhone("");
      setItems("");
      setPaymentMethod("");
      setPrice("");
      setDeliFee("");
    }
  };

  return (
    <div className="bg-gray-300 min-h-screen">
      {/* Header */}
      <div className="flex bg-white items-center justify-between mb-6 gap-4 px-3 py-6">
        <p className="text-2xl font-bold">Add Parcel</p>
      </div>

      {/* form */}
      <div className="mx-3 bg-white px-6 pt-6 pb-[100px] rounded-lg space-y-5">
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
          <label className="font-bold text-lg">Address</label>
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
              placeholder="Enter Address"
            />
            <FaRegCopy />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="space-y-3 w-1/2 relative">
            <label className="font-bold text-lg">Seller</label>
            <div
              onClick={() => setShowSeller(!showSeller)}
              className={`flex items-center justify-between w-full px-2 py-3 overflow-hidden border-2 rounded-lg ${
                !seller && showErr ? "border-red-500" : "border-gray-300"
              }`}
            >
              <p className="truncate w-24 text-gray-500">
                {seller || "Select seller"}
              </p>
              <BiDownArrow size={25} />
            </div>
            {/* {showSeller && (
              <div className="absolute w-full top-[80px] right-0 bg-white border border-gray-300 rounded-t rounded-xl shadow-sm">
                <div className="text-center">
                  <p
                    className="truncate p-2 border-b border-gray-200"
                    onClick={() => {
                      setSeller("Me Me - 1");
                      setShowSeller(!showSeller);
                    }}
                  >
                    Me Me - 1
                  </p>
                </div>
              </div>
            )} */}
          </div>
          <div className="space-y-3 w-1/2 relative">
            <label className="font-bold text-lg">Payment Status</label>
            <div
              onClick={() => setDropDown(!dropDown)}
              className={`flex items-center justify-between w-full px-2 py-3 overflow-hidden border-2 rounded-lg ${
                !paymentMethod && showErr ? "border-red-500" : "border-gray-300"
              }`}
            >
              <p className="truncate w-24 text-gray-500">
                {paymentMethod || "Select payment"}
              </p>
              <BiDownArrow size={25} />
            </div>
            {dropDown && (
              <div className="absolute w-full top-[80px] right-0 bg-white border border-gray-300 rounded-t rounded-xl shadow-sm">
                <div className="text-center">
                  <p
                    className="truncate p-2 border-b border-gray-200"
                    onClick={() => {
                      setPaymentMethod("Delivery Only");
                      setDropDown(!dropDown);
                    }}
                  >
                    Deli Only
                  </p>
                  <p
                    className="truncate p-2 border-b border-gray-200"
                    onClick={() => {
                      setPaymentMethod("Fully Paid");
                      setDropDown(!dropDown);
                    }}
                  >
                    paid
                  </p>
                  <p
                    className="truncate p-2 border-b border-gray-200"
                    onClick={() => {
                      setPaymentMethod("COD");
                      setDropDown(!dropDown);
                    }}
                  >
                    COD{" "}
                  </p>
                  <p
                    className="truncate p-2"
                    onClick={() => {
                      setPaymentMethod("Gate Drop Off");
                      setDropDown(!dropDown);
                    }}
                  >
                    Gate Drop Off
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="space-y-3 w-1/2">
            <label className="font-bold text-lg">Price</label>
            <div
              className={`flex items-center w-full px-4 py-3 border-2 rounded-lg ${
                !price && showErr ? "border-red-500" : "border-gray-300"
              }`}
            >
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full focus:outline-none"
                placeholder="Parcel Price"
              />
            </div>
          </div>
          <div className="space-y-3 w-1/2">
            <label className="font-bold text-lg">Delivery Fees</label>
            <div
              className={`flex items-center w-full px-4 py-3 border-2 rounded-lg ${
                !DeliFee && showErr ? "border-red-500" : "border-gray-300"
              }`}
            >
              <input
                type="number"
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
            } justify-center w-full flex items-center gap-2 mt-10 text-white font-medium rounded-xl px-4 py-3`}
          >
            Add Parcel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateParcel;
