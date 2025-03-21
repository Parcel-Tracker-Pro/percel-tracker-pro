import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { format, startOfDay, endOfDay } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-swipeable-list/dist/styles.css";
import { FaMagnifyingGlass, FaTrash } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import getAllPercel from "../../api/percel/getAllPercel";
import deleteParcel from "../../api/percel/deleteParcel";
import noParcel from "../../assets/images/noparcel.svg";
import Loading from "../Loading";
import ConfirmModel from "../Model/ConfirmModel";
import { UserCog } from "lucide-react";

function PercelPage() {
  const role = localStorage.getItem("parcelRole");
  const name = localStorage.getItem("percelUsername");
  console.log("name", name);
  console.log("work");
  const navigate = useNavigate();
  const today = new Date();
  const [filteredParcels, setFilteredParcels] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedParcels, setSelectedParcels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [startDate, setStartDate] = useState(
    sessionStorage.getItem("startDate") || startOfDay(today)
  );
  const [endDate, setEndDate] = useState(
    sessionStorage.getItem("endDate") || endOfDay(today)
  );
  const [dateRange, setDateRange] = useState([
    {
      startDate: startOfDay(today),
      endDate: endOfDay(today),
      key: "selection",
    },
  ]);

  // console.log(filteredParcels);

  const handleDateRangeChange = (ranges) => {
    setDateRange([
      {
        ...ranges.selection,
        startDate: startOfDay(ranges.selection.startDate),
        endDate: endOfDay(ranges.selection.endDate),
      },
    ]);
  };

  const ApplyDate = () => {
    setStartDate(startOfDay(dateRange[0].startDate));
    setEndDate(endOfDay(dateRange[0].endDate));
    setShowDatePicker(false);
    sessionStorage.setItem("startDate", dateRange[0].startDate);
    sessionStorage.setItem("endDate", dateRange[0].endDate);
  };

  const handleDelete = async () => {
    const data = {
      ids: selectedParcels,
    };
    const res = await deleteParcel(data);
    if (res.code === 200) {
      getPercels();
      setShowDelete(false);
      setSelectedParcels([]);
    }
  };

  const selectAll = () => {
    if (selectedParcels.length === filteredParcels.length) {
      setSelectedParcels([]);
    } else {
      setSelectedParcels(filteredParcels.map((parcel) => parcel._id));
    }
  };

  const getPercels = async () => {
    setLoading(true);
    const start = format(startDate, "yyyy-MM-dd");
    const end = format(endDate, "yyyy-MM-dd");
    // console.log(startDate, endDate);

    const response = await getAllPercel({ start, end });
    console.log(response);
    if (response.code === 200) {
      if (role === "owner") {
        setFilteredParcels(response.data);
      } else {
        setFilteredParcels(
          response.data.filter((parcel) => parcel.seller == name)
        );
      }

      setLoading(false);
    }
    // console.log(response);
  };

  useEffect(() => {
    getPercels();
  }, [startDate, endDate]);

  return (
    <div className="overflow-hidden w-full">
      {/* Header */}
      <div className="flex items-center bg-white justify-between py-5 gap-4 px-4">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="button button-color text-color border border-primary "
          >
            <FaCalendarAlt className="text-color" />
            {format(startDate, "MMMM d,yyyy") == format(endDate, "MMMM d,yyyy")
              ? format(startDate, "dd-MM-yyyy")
              : `${format(startDate, "dd-MM-yyyy")} - ${format(
                  endDate,
                  "dd-MM-yyyy"
                )}`}
          </button>
          {role === "owner" && (
            <Link
              to="/admin/acc"
              className="button button-color text-color border border-primary "
            >
              <UserCog size={18} className="text-color" />
            </Link>
          )}
        </div>
        <div
          className="flex bg-primary items-center border border-gray-500 rounded-full p-2"
          onClick={() => navigate("search")}
        >
          <FaMagnifyingGlass className="text-color" />
        </div>
      </div>

      {/* Date Range Picker */}
      {showDatePicker && (
        <div className="mb-4 bg-white rounded-lg shadow-md absolute right-0 z-10">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="header-text">Select Date Range</h3>
            </div>
          </div>
          <DateRange
            editableDateInputs={true}
            onChange={handleDateRangeChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            className="p-4"
          />
          <div className="flex items-center justify-end gap-2 p-4">
            <button
              className="flex items-center w-24 justify-center py-3 button-color text-color  rounded-xl"
              onClick={() => {
                setShowDatePicker(false);
                setDateRange([
                  {
                    ...dateRange[0],
                    startDate: startOfDay(startDate),
                    endDate: endOfDay(endDate),
                  },
                ]);
              }}
            >
              Cancel
            </button>

            <button
              className="flex items-center w-24 justify-center py-3 bg-primary  rounded-xl text-color"
              onClick={() => ApplyDate()}
            >
              <p>OK</p>
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          {/* Table */}
          <div className="bg-gray-200 pt-6">
            <div className="flex justify-between items-center mx-1 mb-5 px-2">
              <p className="header-text">
                {format(dateRange[0].startDate, "MMMM d,yyyy") ==
                format(dateRange[0].endDate, "MMMM d,yyyy")
                  ? format(dateRange[0].startDate, "MMMM d,yyyy") ==
                    format(today, "MMMM d,yyyy")
                    ? "Today"
                    : "Available Parcels"
                  : "Available Parcels"}
              </p>

              <button
                className={`cancel ${
                  selectedParcels.length === 0 &&
                  "opacity-50 cursor-not-allowed"
                }`}
                onClick={() => setShowDelete(true)}
                // onClick={handleDelete}
                disabled={selectedParcels.length === 0}
              >
                <FaTrash size={20} />
                <p> Remove Parcels</p>
              </button>
            </div>
            {/* ____________________________________________ */}
            {filteredParcels.length > 0 ? (
              <div className="w-full">
                <div className="rounded-2xl overflow-hidden mx-3">
                  <div className="flex w-full bg-white py-2 pb-4">
                    <div className="w-2/12 py-3 text-center text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        checked={
                          selectedParcels.length === filteredParcels.length &&
                          selectedParcels.length > 0
                        }
                        type="checkbox"
                        className="h-4 w-4 text-[#6B5201] focus:ring-indigo-500 border-gray-300 rounded"
                        onChange={selectAll}
                      />
                    </div>

                    <div className="w-2/12 py-3 text-color text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                      <span className="ms-2">No</span>
                    </div>

                    <div className="w-5/12 py-3 text-color text-left text-[13px] font-bold text-gray-500 uppercase">
                      Customer
                    </div>

                    <div className="w-3/12 py-3 text-color text-center text-[13px] uppercase font-bold">
                      <span className="me-3">Price</span>
                    </div>
                  </div>

                  <div className="w-full bg-white h-[65vh] overflow-y-auto pb-20">
                    {filteredParcels.length > 0 &&
                      filteredParcels.map((parcel, index) => (
                        <div key={index}>
                          <div
                            className="w-full bg-white flex hover:bg-gray-50 cursor-pointer items-center border-b border-gray-500"
                            onClick={() => navigate(`detail/${parcel._id}`)}
                          >
                            <div
                              className="w-2/12 py-3 text-center text-[13px] font-medium text-gray-500"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                checked={selectedParcels.includes(parcel._id)}
                                onChange={(e) =>
                                  setSelectedParcels(
                                    e.target.checked
                                      ? [...selectedParcels, parcel._id]
                                      : selectedParcels.filter(
                                          (p) => p !== parcel._id
                                        )
                                  )
                                }
                              />
                            </div>
                            <div className="w-2/12 text-left py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className="ms-2"> {index + 1}</span>
                            </div>
                            <div className="w-5/12 text-left py-4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-900">
                              {parcel.customerName}
                            </div>

                            <div className="w-3/12 py-4 text-center text-sm text-gray-900">
                              <span className="me-3"> {parcel.price} Ks</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-[65vh]">
                <img src={noParcel} alt="no parcel" />
                <h3 className="font-bold text-xl mb-2">No Parcels Yet</h3>
                <p className="text-gray-500">
                  Let’s add your first parcel to get started.
                </p>
              </div>
            )}
          </div>
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
}

export default PercelPage;
