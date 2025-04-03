import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import CeateAParcel from "../../api/percel/CreateParcle";
import { format } from "date-fns";
import { BiDownArrow } from "react-icons/bi";
import getAllEmployees from "../../api/employee/getAllemployees";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import { Calendar } from "react-date-range";

const CreateParcel = () => {
  const role = localStorage.getItem("parcelRole");
  const today = new Date();
  const username = localStorage.getItem("percelUsername");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [price, setPrice] = useState("");
  const [DeliFee, setDeliFee] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [seller, setSeller] = useState(username);
  const [dropDowntwo, setDropDownTwo] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [date, setDate] = useState(today);

  // console.log(date);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCustomerName(text);
    } catch (err) {
      // console.error("Failed to read clipboard contents: ", err);
      alert("Failed to paste from clipboard, please try again.");
    }
  };

  const handlePasteAddress = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setPhone(text);
    } catch (err) {
      // console.error("Failed to read clipboard contents: ", err);
      alert("Failed to paste from clipboard, please try again.");
    }
  };

  const addParcel = async () => {
    if (
      !customerName ||
      !phone ||
      !seller ||
      !paymentMethod ||
      !price ||
      !DeliFee
    ) {
      setShowErr(true);
      return;
    }

    console.log(seller);

    const data = {
      customerName,
      address: phone,
      paymentStatus: paymentMethod,
      price: price * 1,
      deliveryFee: DeliFee * 1,
      seller: seller,
      parcelCreatedAt: format(date, "yyyy-MM-dd"),
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
      setShowErr(false);
    }
  };

  const getEmployees = async () => {
    const res = await getAllEmployees();
    if (res.code === 200) {
      setEmployee(res.data.userData.map((e) => e.username));
    }
  };

  // console.log(employee);

  useEffect(() => {
    if (role === "owner") {
      getEmployees();
    }
  }, []);

  return (
    <motion.div className="bg-gray-300 min-h-screen">
      {/* Header */}
      <div className="flex bg-white items-center justify-between mb-6 gap-4 px-3 py-6">
        <p className="text-2xl font-bold">Add Parcel</p>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => {
              setShowDatePicker(!showDatePicker);
              // console.log(showDatePicker);
            }}
            className="button button-color text-color border border-primary transition-all duration-300 "
          >
            <FaCalendarAlt className="text-color" />
            {format(date, "MMMM d,yyyy")}
          </button>
        </div>
      </div>

      {/* Date Range Picker */}
      {showDatePicker && (
        <div className="mb-4 bg-white rounded-lg shadow-md absolute right-0 z-10">
          <Calendar
            date={today}
            onChange={(date) => {
              setDate(date);
              setShowDatePicker(false);
            }}
          />
        </div>
      )}

      {/* form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-3 bg-white px-6 pt-6 pb-[100px] rounded-lg space-y-5"
      >
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
            <FaRegCopy onClick={handlePaste} className="cursor-pointer" />
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
            <FaRegCopy
              onClick={handlePasteAddress}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="space-y-3 w-1/2 relative">
            <label className="font-bold text-lg">Seller</label>
            <div
              onClick={() => setDropDownTwo(!dropDowntwo)}
              className={`flex items-center justify-between w-full px-2 py-3 overflow-hidden border-2 rounded-lg ${
                !seller && showErr ? "border-red-500" : "border-gray-300"
              }`}
            >
              <p className="truncate w-24 text-gray-500">
                {seller || "Select seller"}
              </p>
              <BiDownArrow size={25} />
            </div>
            {dropDowntwo && role === "owner" && (
              <div className="absolute w-full top-[80px] h-40 overflow-y-scroll right-0 bg-white border border-gray-300 rounded-t rounded-xl shadow-sm">
                <div className="text-center">
                  {employee.map((emp, index) => (
                    <p
                      key={index}
                      className="truncate p-2 border-b border-gray-200"
                      onClick={() => {
                        setSeller(emp);
                        setDropDownTwo(!dropDowntwo);
                      }}
                    >
                      {emp}
                    </p>
                  ))}
                </div>
              </div>
            )}
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
                    Delivery Only
                  </p>
                  <p
                    className="truncate p-2 border-b border-gray-200"
                    onClick={() => {
                      setPaymentMethod("Fully Paid");
                      setDropDown(!dropDown);
                    }}
                  >
                    Fully Paid
                  </p>
                  <p
                    className="truncate p-2 border-b border-gray-200"
                    onClick={() => {
                      setPaymentMethod("COD");
                      setDropDown(!dropDown);
                    }}
                  >
                    COD
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
              !seller ||
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
      </motion.div>
    </motion.div>
  );
};

export default CreateParcel;
