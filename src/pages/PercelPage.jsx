import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { format, startOfDay, endOfDay, parseISO } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

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

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Parcel List</h1>
        <div className="flex gap-2">
          <button
            className={`p-2 ${
              showDatePicker ? "bg-gray-600" : "bg-gray-800"
            } text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 relative`}
            onClick={handleDateClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            className={`p-2 ${
              showSearch ? "bg-gray-600" : "bg-gray-800"
            } text-white rounded-lg hover:bg-gray-700 transition-colors duration-200`}
            onClick={handleSearchClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            className={`p-2 ${
              showFilters ? "bg-gray-600" : "bg-gray-800"
            } text-white rounded-lg hover:bg-gray-700 transition-colors duration-200`}
            onClick={handleFilterClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4a1 1 0 011-1z" />
            </svg>
          </button>
        </div>
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

      {/* Search Panel */}
      {showSearch && (
        <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-white rounded-lg pl-10 pr-3 py-2 border border-gray-300"
                placeholder="Search by Customer..."
                value={filters.customer}
                onChange={(e) => handleFilterChange("customer", e.target.value)}
              />
              <svg
                className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-white rounded-lg pl-10 pr-3 py-2 border border-gray-300"
                placeholder="Search by Staff No..."
                value={filters.staffNo}
                onChange={(e) => handleFilterChange("staffNo", e.target.value)}
              />
              <svg
                className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-gray-900">
                Filter Parcels
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Date Range Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={format(dateRange[0].startDate, "yyyy-MM-dd")}
                    onChange={(e) =>
                      handleDateRangeChange({
                        selection: {
                          ...dateRange[0],
                          startDate: parseISO(e.target.value),
                        },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={format(dateRange[0].endDate, "yyyy-MM-dd")}
                    onChange={(e) =>
                      handleDateRangeChange({
                        selection: {
                          ...dateRange[0],
                          endDate: parseISO(e.target.value),
                        },
                      })
                    }
                    min={format(dateRange[0].startDate, "yyyy-MM-dd")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Parcel Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parcel Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">Select Parcel Status</option>
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="failed">Failed</option>
                  <option value="success">Success</option>
                </select>
              </div>

              {/* Seller */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seller
                </label>
                <select
                  value={filters.staffNo}
                  onChange={(e) =>
                    handleFilterChange("staffNo", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">Select Seller Staff</option>
                  <option value="1">Staff 1</option>
                  <option value="2">Staff 2</option>
                  <option value="3">Staff 3</option>
                  <option value="4">Staff 4</option>
                  <option value="5">Staff 5</option>
                </select>
              </div>

              {/* Delivery */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                  <option value="">Select Delivery Status</option>
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                  <option value="in_transit">In Transit</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  onClick={handleClearFilters}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mb-4">
        {/* Active Filters Display */}
        {(filters.status || filters.staffNo) && (
          <div className="bg-gra`x`-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">
                Filters Data
              </h3>
              <button
                onClick={handleClearFilters}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                Clear Filter
                <svg
                  className="ml-2 h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Date Range Tag */}
              {(dateRange[0].startDate || dateRange[0].endDate) && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-700 text-white text-sm">
                  <span>
                    {format(dateRange[0].startDate, "dd/MM/yyyy")} -{" "}
                    {format(dateRange[0].endDate, "dd/MM/yyyy")}
                  </span>
                </div>
              )}

              {/* Status Tag */}
              {filters.status && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-700 text-white text-sm">
                  <span className="capitalize">{filters.status}</span>
                </div>
              )}

              {/* Staff Tag */}
              {filters.staffNo && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-700 text-white text-sm">
                  <span>Staff {filters.staffNo}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-300 rounded-lg overflow-hidden">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {!isFiltered ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Please apply filters to see parcel data
                  </td>
                </tr>
              ) : filteredParcels.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No parcels found matching the current filters
                  </td>
                </tr>
              ) : (
                filteredParcels.map((parcel) => (
                  <tr key={parcel.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {parcel.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {parcel.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <p className="bg-orange-200 p-2 rounded-full text-center">
                        {parcel.staffNo}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {parcel.price} Ks
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          parcel.status
                        )}`}
                      >
                        {parcel.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDisplayDate(parcel.date)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="fixed bottom-20 left-0 w-full">
          <div className="flex items-center justify-between bg-white shadow-lg border border-gray-300 w-11/12 mx-auto px-4 py-6 text-gray-600 font-bold rounded-lg">
            <div className="">
              <p className="mb-2 text-[16px]">Total Parcels</p>
              <p className="text-black text-[12px]">{totalParcels}</p>
            </div>
            <div className="">
              <p className="mb-2 text-[16px]">Deli Fee</p>
              <p className="text-black text-[12px]">75,000 Ks</p>
            </div>
            <div className="">
              <p className="mb-2 text-[16px]">Total Price</p>
              <p className="text-black text-[12px]">
                {totalPrice.toLocaleString()} Ks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PercelPage;
