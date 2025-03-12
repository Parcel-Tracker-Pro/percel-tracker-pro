import { MoveLeft, Trash } from "lucide-react";
import { TiEdit } from "react-icons/ti";
import { FaRegCopy } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getAPercel from "../../api/percel/getAPercel";
import Loading from "../Loading";
import deleteParcel from "../../api/percel/deleteParcel";
import ConfirmModel from "../Model/ConfirmModel";

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

  const getPercel = async () => {
    const res = await getAPercel({ id });
    // console.log(res);
    if (res.code === 200) {
      setLoading(false);
      setCustomerName(res.data.customerName);
      setPhone(res.data.address);
      setItems(10);
      setPaymentMethod(res.data.paymentStatus);
      setPrice(res.data.price);
      setDeliFee(res.data.DeliveryFee);
      setSeller(res.data.seller);
    }
  };

  useEffect(() => {
    getPercel();
  }, []);

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

  return (
    <div>
      {/* Header */}
      <div className="bg-white mb-6 flex items-center justify-between gap-4 px-4 py-5">
        <div className="flex items-center">
          <MoveLeft
            className="mr-4 text-color"
            size={23}
            onClick={() => navigate(-1)}
          />
          <div>
            <p className="header-text">Percel Detail</p>
            {/* <span className="small-text">{seller}</span> */}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center bg-orange-200 font-medium rounded-full px-4 py-3"
            // onClick={handleDelete}
            onClick={() => setShowDelete(true)}
          >
            <Trash className="header-text" size={20} />
          </button>

          {/* <button
            className="flex items-center bg-orange-200 font-medium rounded-full px-4 py-3"
            onClick={() => setEdit(!edit)}
          >
            <TiEdit className="header-text" size={20} />
          </button> */}
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
            <label className="font-bold text-lg">Phone Number</label>
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
          )}
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
