import { MoveLeft, Trash } from "lucide-react";
import { TiEdit } from "react-icons/ti";
import { FaCalendarAlt, FaRegCopy } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getAPercel from "../../api/percel/getAPercel";
import Loading from "../Loading";
import deleteParcel from "../../api/percel/deleteParcel";
import ConfirmModel from "../Model/ConfirmModel";
import { CircleCheckBig, ClipboardCheck } from "lucide-react";
import UpdateStatus from "../../api/percel/updateStatus";
import UpdateParcel from "../../api/percel/updateParcel";
import { format } from "date-fns";

const PercelDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  //   console.log(id);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [price, setPrice] = useState("");
  const [DeliFee, setDeliFee] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [seller, setSeller] = useState("");
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [status, setStatus] = useState("On Deli");
  const [created, setCreated] = useState("");
  const [updated, setUpdated] = useState("");

  const getPercel = async () => {
    const res = await getAPercel({ id });
    console.log(res.data.ParcelUpdatedAt);
    if (res.code === 200) {
      setLoading(false);
      setCustomerName(res.data.customerName);
      setPhone(res.data.address);
      setItems(10);
      setPaymentMethod(res.data.paymentStatus);
      setPrice(res.data.price);
      setDeliFee(res.data.deliveryFee);
      setSeller(res.data.seller);
      setStatus(res.data.deliveryStatus);
      setCreated(res.data.parcelCreatedAt);
      setUpdated(res.data.ParcelUpdatedAt);
    }
  };

  useEffect(() => {
    getPercel();
  }, []);

  const handleDelete = async () => {
    const data = {
      ids: [id],
    };
    const res = await deleteParcel(data);
    // console.log(res);
    if (res.code === 200) {
      navigate("/admin");
    }
  };

  const updateParcelStatus = async (value) => {
    console.log(value);
    const data = {
      deliveryStatus: value,
    };
    const res = await UpdateStatus(data, id);
    console.log(res);
    if (res.code === 200) {
      setShowCancel(false);
      getPercel();
      // console.log("work");
    }
  };

  const updateParcelDetail = async (value) => {
    console.log(value);
    const data = {
      customerName,
      address: phone,
      price: price,
      deliveryFee: DeliFee,
      paymentStatus: paymentMethod,
      parcelUpdatedAt: format(new Date(), "yyyy-MM-dd"),
    };
    const res = await UpdateParcel(data, id);
    console.log(res);
    if (res.code === 200) {
      setShowCancel(false);
      setEdit(false);
      getPercel();
      // console.log("work");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white mb-6 flex items-center justify-between gap-4 px-4 py-5">
        <div className="flex items-center">
          <MoveLeft
            className="mr-4 text-color cursor-pointer"
            size={23}
            onClick={() => navigate(-1)}
          />
          <div>
            <p className="header-text">Percel Detail</p>
            <div className="flex gap-2">
              <div className="border mt-2 border-black w-24 justify-center py-1 flex items-center gap-1 rounded-full">
                <FaCalendarAlt size={10} color="#6B5201" />
                <p className="text-[10px]">
                  {created ? format(created, "dd.MM.yyyy") : "-"}
                </p>
              </div>
              <div className="border mt-2 border-black w-24 justify-center py-1 flex items-center gap-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="15px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#6B5201"
                >
                  <path d="M40-160v-80h200v-80H80v-80h160v-80H122v-80h118v-118l-78-168 72-34 94 200h464l-78-166 72-34 94 200v520H40Zm440-280h160q17 0 28.5-11.5T680-480q0-17-11.5-28.5T640-520H480q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440ZM320-240h480v-360H320v360Zm0 0v-360 360Z" />
                </svg>
                <p className="text-[10px]">
                  {updated ? format(updated, "dd.MM.yyyy") : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center bg-orange-200 font-medium rounded-full px-4 py-3"
            onClick={() => setEdit(!edit)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="black"
            >
              <path d="M216-720h528l-34-40H250l-34 40Zm184 270 80-40 80 40v-190H400v190ZM200-120q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v139q-21 0-41.5 3T760-545v-95H640v205l-77 77-83-42-160 80v-320H200v440h280v80H200Zm440-520h120-120Zm-440 0h363-363Zm360 520v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-340L683-120H560Zm300-263-37-37 37 37ZM620-180h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
            </svg>
          </button>

          <button
            className="flex items-center bg-orange-200 font-medium rounded-full px-4 py-3"
            // onClick={handleDelete}
            onClick={() => setShowDelete(true)}
          >
            <Trash className="header-text" size={20} />
          </button>
        </div>
      </div>

      {/* form */}
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="mx-3 bg-white px-6 pt-6 pb-20 rounded-lg space-y-5">
          <div className="space-y-3">
            <label className="font-bold text-lg">Customer Name</label>
            <div
              className={`flex items-center w-full px-4 py-3 border-2 rounded-lg ${
                !customerName && showErr
                  ? "border-red-500"
                  : `${edit ? "border-gray-300" : "border-gray-100"}`
              }`}
            >
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full focus:outline-none"
                placeholder="Enter Customer Name"
                readOnly={!edit}
              />
              <FaRegCopy />
            </div>
          </div>
          <div className="space-y-3">
            <label className="font-bold text-lg">Address</label>
            <div
              className={`flex items-center w-full px-4 py-3 border-2 rounded-lg ${
                !phone && showErr
                  ? "border-red-500"
                  : `${edit ? "border-gray-300" : "border-gray-100"}`
              }`}
            >
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full focus:outline-none"
                placeholder="Enter Phone Number"
                readOnly={!edit}
              />
              <FaRegCopy />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="space-y-3 w-1/2">
              <label className="font-bold text-lg">Seller</label>
              <div
                className={`flex items-center w-full px-4 py-3 border-2 rounded-lg ${
                  !items && showErr
                    ? "border-red-500"
                    : `${edit ? "border-gray-300" : "border-gray-100"}`
                }`}
              >
                <input
                  value={seller}
                  onChange={(e) => setSeller(e.target.value)}
                  type="text"
                  className="w-full focus:outline-none"
                  placeholder="Enter Seller"
                  readOnly={!edit}
                />
              </div>
            </div>
            <div className="space-y-3 w-1/2">
              <label className="font-bold text-lg">Payment</label>
              <div
                className={`flex items-center w-full px-4 py-3 border-2 rounded-lg ${
                  !paymentMethod && showErr
                    ? "border-red-500"
                    : `${edit ? "border-gray-300" : "border-gray-100"}`
                }`}
              >
                <select
                  className="w-full focus:outline-none bg-white"
                  value={paymentMethod}
                  disabled={!edit}
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
            <div className="space-y-3 w-1/2">
              <label className="font-bold text-lg">Parcel</label>
              <div
                className={`flex items-center w-full px-4 py-3 border-2 rounded-lg ${
                  !price && showErr
                    ? "border-red-500"
                    : `${edit ? "border-gray-300" : "border-gray-100"}`
                }`}
              >
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full focus:outline-none"
                  placeholder="Parcel Price"
                  readOnly={!edit}
                />
              </div>
            </div>
            <div className="space-y-3 w-1/2">
              <label className="font-bold text-lg">Delivery Fees</label>
              <div
                className={`flex items-center w-full px-4 py-3 border-2 rounded-lg ${
                  !DeliFee && showErr
                    ? "border-red-500"
                    : `${edit ? "border-gray-300" : "border-gray-100"}`
                }`}
              >
                <input
                  type="text"
                  value={DeliFee}
                  onChange={(e) => setDeliFee(e.target.value)}
                  className="w-full focus:outline-none"
                  placeholder="Delivery Fees"
                  readOnly={!edit}
                />
              </div>
            </div>
          </div>
          {edit && (
            <div className=" flex gap-4 bg-white border border-gray-200 shadow-md p-5 rounded-xl fixed left-0 bottom-0 w-full">
              <button
                className="flex items-center gap-2 px-6"
                onClick={() => setEdit(false)}
              >
                <ClipboardCheck size={20} />
                Discard
              </button>
              <button
                onClick={() => updateParcelDetail()}
                className={`bg-primary flex items-center justify-center gap-4 text-white px-4 py-3 rounded w-full active:scale-95 ${
                  !customerName ||
                  !phone ||
                  !items ||
                  !paymentMethod ||
                  !price ||
                  !DeliFee
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={!customerName || !price || !DeliFee}
              >
                Confirm Edit
                <CircleCheckBig />
              </button>
            </div>
          )}
        </div>
      )}

      {status !== "On Deli" && !edit && (
        <div className="bg-white space-y-5 border border-gray-200 shadow-md p-5 rounded-xl fixed bottom-0 w-full">
          {showCancel && (
            <button
              onClick={() =>
                updateParcelStatus(status === "Success" ? "Cancel" : "Success")
              }
              className="bg-[#0E3F66] text-white px-4 py-3 rounded w-full active:scale-95 "
            >
              {status === "Success" ? "Cancel" : "Success"}
            </button>
          )}
          <button
            onClick={() => setShowCancel(true)}
            className="bg-[#0E3F66] text-white px-4 py-3 rounded w-full active:scale-95 "
          >
            {status}
          </button>
        </div>
      )}

      <ConfirmModel
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        submit={handleDelete}
        text="Delete Parcel Cannot be recovered !!"
      />
    </div>
  );
};

export default PercelDetail;
