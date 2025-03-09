import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { format, startOfDay, endOfDay, parseISO } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  LeadingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { FaMagnifyingGlass, FaTrash } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

function PercelPage() {
  const today = new Date();
  const [filters, setFilters] = useState({
    no: "",
    customer: "",
    staffNo: "",
    price: "",
    status: "",
  });

  const [filteredParcels, setFilteredParcels] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: startOfDay(today),
      endDate: endOfDay(today),
      key: "selection",
    },
  ]);

  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const parcels = [
    {
      id: "01",
      customer: "Mia Khalif",
      status: "Pending",
      price: "42,000",
      staffNo: "1",
      date: "2025-02-15",
    },
    {
      id: "02",
      customer: "Than Than Eye",
      status: "Active",
      price: "43,000",
      staffNo: "2",
      date: "2025-02-16",
    },
    {
      id: "03",
      customer: "Lay Phyu",
      status: "Pending",
      price: "12,000",
      staffNo: "3",
      date: "2025-02-16",
    },
    {
      id: "04",
      customer: "Lin Lin Lin",
      status: "Failed",
      price: "54,000",
      staffNo: "1",
      date: "2025-02-17",
    },
    {
      id: "05",
      customer: "Naw Htoo Aung",
      status: "Success",
      price: "65,000",
      staffNo: "2",
      date: "2025-02-17",
    },
    {
      id: "06",
      customer: "Zin Zin Latt",
      status: "Active",
      price: "34,000",
      staffNo: "3",
      date: "2025-02-17",
    },
    {
      id: "07",
      customer: "Rafaealla",
      status: "Pending",
      price: "75,000",
      staffNo: "4",
      date: "2025-02-17",
    },
    {
      id: "08",
      customer: "Khaing Wint",
      status: "Success",
      price: "75,000",
      staffNo: "5",
      date: "2025-02-17",
    },
    {
      id: "09",
      customer: "Khaing Wint",
      status: "Success",
      price: "75,000",
      staffNo: "5",
      date: "2025-02-18",
    },
    {
      id: "10",
      customer: "Ko Shine",
      status: "Pending",
      price: "5,000",
      staffNo: "5",
      date: "2025-02-18",
    },
  ];

  useEffect(() => {
    const filterParcels = () => {
      // Check if any filter is active
      const hasActiveFilters =
        Object.values(filters).some((filter) => filter !== "") ||
        dateRange[0].startDate !== startOfDay(today) ||
        dateRange[0].endDate !== endOfDay(today);

      setIsFiltered(hasActiveFilters);

      if (!hasActiveFilters) {
        setFilteredParcels([]);
        return;
      }

      const filtered = parcels.filter((parcel) => {
        const matchesText =
          parcel.id.toLowerCase().includes(filters.no.toLowerCase()) &&
          parcel.customer
            .toLowerCase()
            .includes(filters.customer.toLowerCase()) &&
          parcel.staffNo.toString().includes(filters.staffNo) &&
          parcel.price.includes(filters.price) &&
          (filters.status === "" ||
            parcel.status.toLowerCase() === filters.status.toLowerCase());

        const parcelDate = parseISO(parcel.date);
        const { startDate, endDate } = dateRange[0];

        const matchesDate =
          parcelDate >= startOfDay(startDate) &&
          parcelDate <= endOfDay(endDate);

        return matchesText && matchesDate;
      });

      setFilteredParcels(filtered);
    };

    filterParcels();
  }, [filters, dateRange]);

  const handleClearFilters = () => {
    setFilters({
      no: "",
      customer: "",
      staffNo: "",
      price: "",
      status: "",
    });
    setDateRange([
      {
        startDate: startOfDay(today),
        endDate: endOfDay(today),
        key: "selection",
      },
    ]);
    setIsFiltered(false);
    setFilteredParcels([]);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "success":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    setShowFilters(false);
    setShowDatePicker(false);
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
    setShowSearch(false);
    setShowDatePicker(false);
  };

  const handleDateClick = () => {
    setShowDatePicker(!showDatePicker);
    setShowSearch(false);
    setShowFilters(false);
  };

  const handleDateRangeChange = (ranges) => {
    setDateRange([
      {
        ...ranges.selection,
        startDate: startOfDay(ranges.selection.startDate),
        endDate: endOfDay(ranges.selection.endDate),
      },
    ]);
  };

  const totalParcels = filteredParcels.length;
  const totalPrice = filteredParcels.reduce(
    (sum, parcel) => sum + parseInt(parcel.price.replace(/,/g, "")),
    0
  );

  const formatDisplayDate = (date) => {
    return date ? format(parseISO(date), "MMM dd, yyyy") : "";
  };

  const trailingActions = (parcel) => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => console.log(`Delete parcel with ID: ${parcel.id}`)}
      >
        <div className="bg-red-500 h-full flex items-center px-4 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Delete
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  const leadingActions = (parcel) => (
    <LeadingActions>
      <SwipeAction
        onClick={() => console.log(`Edit parcel with ID: ${parcel.id}`)}
      >
        <div className="bg-blue-500 h-full flex items-center px-4 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  return (
    <div className="mb-20 overflow-hidden w-full">
      {/* Header */}
      <div className="flex items-center mb-6 gap-4">
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
          className="bg-white flex items-center gap-2 bg-primary font-medium rounded-full px-4 py-3"
        >
          <FaCalendarAlt className="text-white" />
          <p className="font-medium text-white">10.3.2023</p>
        </button>
      </div>

      {/* Date Range Picker */}
      {showDatePicker && (
        <div className="mb-4 bg-white rounded-lg shadow-md absolute right-0 z-10">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-700">
                Select Date Range
              </h3>
              <button
                onClick={() =>
                  setDateRange([
                    {
                      startDate: startOfDay(today),
                      endDate: endOfDay(today),
                      key: "selection",
                    },
                  ])
                }
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Reset to Today
              </button>
            </div>
          </div>
          <DateRange
            editableDateInputs={true}
            onChange={handleDateRangeChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            className="p-4"
          />
        </div>
      )}

      {/* Table */}
      <div className="mb-4 min-h-screen bg-gray-200 py-4 rounded-lg">
        <div className="flex justify-between items-center mx-1 mb-5">
          <p className="text-2xl font-medium">Today Percel</p>

          <button className="flex items-center gap-2 px-4 py-3 bg-red-500 text-white rounded-full">
            <FaTrash size={20} />
            <p> Remove Parcels</p>
          </button>
        </div>
        {/* ____________________________________________ */}
        <div className="mx-auto w-full flex justify-center">
          <div>
            <div className="flex md:w-full py-2 bg-white mb-2">
              <div className="w-[30px] md:w-[70px] md:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="">No</span>
              </div>
              <div className="w-[150px] md:px-4 py-3 text-center md:text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </div>
              <div className="hidden md:block w-[100px] md:px-4 py-3 text-center md:text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Staff No
              </div>
              <div className="w-[100px] md:w-[150px] md:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </div>
              <div className="w-[70px] md:w-[200px] md:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </div>
              <div className="hidden md:block w-[300px] md:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </div>
            </div>

            <div className="w-[350px] md:w-full">
              {!isFiltered ? (
                <div className="px-6 py-4 text-center text-gray-500">
                  Please apply filters to see parcel data
                </div>
              ) : filteredParcels.length === 0 ? (
                <div className="px-6 py-4 text-center text-gray-500">
                  No parcels found matching the filters
                </div>
              ) : (
                <SwipeableList threshold={0.25} type={ListType.IOS}>
                  {filteredParcels.map((parcel, index) => (
                    <SwipeableListItem
                      key={parcel.id}
                      trailingActions={trailingActions(parcel)}
                      leadingActions={leadingActions(parcel)}
                    >
                      <div className="w-[350px] md:w-full bg-white mb-2 flex hover:bg-gray-50 cursor-pointer items-center">
                        <div className="w-[30px] md:w-[70px] md:px-4 text-center py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className=""> {index + 1}</span>
                        </div>
                        <div className="w-[150px] md:px-4 py-4 text-center md:text-left whitespace-nowrap text-sm text-gray-900">
                          {parcel.customer}
                        </div>
                        <div className="hidden md:block w-[100px] md:px-4 py-4 text-center md:text-left  whitespace-nowrap text-sm text-gray-900">
                          <p className="bg-orange-200 p-2 rounded-full text-center">
                            {parcel.staffNo}
                          </p>
                        </div>
                        <div className="w-[100px] md:w-[150px] md:px-4 py-4 text-center text-sm text-gray-900">
                          {parcel.price} Ks
                        </div>
                        <div className="w-[70px] md:w-[200px] md:px-4 py-4 text-center whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              parcel.status
                            )}`}
                          >
                            {parcel.status}
                          </span>
                        </div>
                        <div className="hidden md:block w-[300px] md:px-4 text-center py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDisplayDate(parcel.date)}
                        </div>
                      </div>
                    </SwipeableListItem>
                  ))}
                </SwipeableList>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PercelPage;
