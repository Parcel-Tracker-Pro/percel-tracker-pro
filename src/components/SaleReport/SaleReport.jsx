import { Eye, EyeOff } from "lucide-react";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";
import getsellersale from "../../api/sale/getsellersale";
import { CircleUserRound } from "lucide-react";
import { DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { format, startOfDay, endOfDay } from "date-fns";
import getdeliveryreport from "../../api/sale/getdellreport";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DateRange } from "react-date-range";

const SaleReport = () => {
  const today = new Date();
  const navigate = useNavigate();
  const [reportdata, setReportData] = useState([]);
  const [deliverydata, setDeliveryData] = useState([]);
  const [showStaff, setShowStaff] = useState(true);
  const [shwoAna, setShowAna] = useState(false);
  const [totalSale, setTotalSale] = useState(0);
  const [topSale, setTopSale] = useState("");
  const [totalCus, setTotalCus] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
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

  const getSellerData = async () => {
    const start = format(startDate, "yyyy-MM-dd");
    const end = format(endDate, "yyyy-MM-dd");
    console.log(start, end);
    const res = await getsellersale({ start, end });
    // console.log("res", res.data.topSeller.sellerName);
    if (res.code === 200) {
      setTopSale(res.data.topSeller.sellerName);
      setTotalSale(res.data.totalSalesValue);
      setTotalCus(res.data.totalParcelCount);
      setReportData(res.data.sellerSalesData);
    }

    // setReportData(res.data.userData);
  };

  // console.log("report", reportdata);

  const getDeliveryData = async () => {
    const start = format(startDate, "yyyy-MM-dd");
    const end = format(endDate, "yyyy-MM-dd");
    const res = await getdeliveryreport({ start, end });
    // console.log("res", res.data);
    if (res.code === 200) {
      setDeliveryData(res.data);
    }
  };

  useEffect(() => {
    getSellerData();
    getDeliveryData();
  }, [startDate, endDate]);

  return (
    <div className="">
      <div className="mb-10 px-3 py-5 bg-white">
        <div className="flex items-center justify-between">
          <p className="header-text">Report</p>

          <button
            className="button button-color"
            onClick={() => setShowAna(!shwoAna)}
          >
            {!shwoAna ? <Eye size={18} /> : <EyeOff size={18} />}
            {!shwoAna ? "View Analytics" : "Hide Analytics"}
          </button>
        </div>

        {shwoAna ? (
          <div className="flex flex-wrap mt-5 text-color">
            <div className="w-1/2 px-1">
              <div className="button-color p-5 rounded-lg border border-gray-200 flex flex-col justify-center ">
                <div className="flex items-center mb-5 gap-4">
                  <RiCustomerService2Line />
                  <span>Top Sale</span>
                </div>

                <p className="text-xl font-bold">{topSale}</p>
              </div>
            </div>

            <div className="w-1/2 px-1">
              <div className="button-color p-5 rounded-lg border border-gray-200 flex flex-col justify-center ">
                <div className="flex items-center mb-5 gap-4">
                  <CircleUserRound />
                  <span>Total Cus</span>
                </div>

                <p className="text-xl font-bold">{totalCus}</p>
              </div>
            </div>

            <div className="w-1/2 px-1 mt-3">
              <div className="button-color p-5 rounded-lg border border-gray-200 flex flex-col justify-center ">
                <div className="flex items-center mb-5 gap-4">
                  <DollarSign />
                  <span>Total Sale</span>
                </div>

                <p className="text-xl font-bold">{totalSale}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-10">
            <div className="w-1/2 flex justify-center">
              <button
                className={`flex flex-col justify-center items-center ${
                  !showStaff ? "text-gray-300" : "text-color"
                }`}
                onClick={() => setShowStaff(true)}
              >
                <CiDeliveryTruck size={18} />
                Delivery
              </button>
            </div>
            <div className="w-1/2 flex justify-center">
              <button
                className={`flex flex-col justify-center items-center ${
                  showStaff ? "text-gray-300" : "text-color"
                }`}
                onClick={() => setShowStaff(false)}
              >
                <RiCustomerService2Line size={18} />
                Staff
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <div className="flex items-center justify-between px-3 mb-5">
          <p className="header-text">Staff Report</p>

          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="button button-color"
          >
            <FaRegCalendarAlt className="" />
            {format(startDate, "MMMM d,yyyy") == format(endDate, "MMMM d,yyyy")
              ? format(startDate, "dd-MM-yyyy")
              : `${format(startDate, "dd-MM-yyyy")} - ${format(
                  endDate,
                  "dd-MM-yyyy"
                )}`}
          </button>

          <div className="mx-auto absolute top-[-100px]">
            {showDatePicker && (
              <div className="mb-4 bg-white rounded-lg shadow-md">
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
          </div>
        </div>

        {!showStaff ? (
          <div>
            {reportdata.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className=""
              >
                <div className="rounded-2xl overflow-hidden mx-3">
                  <div className="flex w-full bg-white py-2 pb-4 px-2">
                    <div className="w-2/12 py-3 text-color text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                      <span className="ms-2">No</span>
                    </div>

                    <div className="w-5/12 py-3 text-color text-left text-[13px] font-bold text-gray-500 uppercase">
                      Staff
                    </div>

                    <div className="w-5/12 py-3 text-color text-center text-[13px] uppercase font-bold">
                      <span className="me-3">Total Sale</span>
                    </div>
                  </div>

                  <div className="w-full bg-white h-[65vh] overflow-y-auto pb-20">
                    {reportdata.length > 0 &&
                      reportdata.map((parcel, index) => (
                        <div key={index}>
                          <div
                            className="px-2 w-full bg-white flex hover:bg-gray-50 cursor-pointer items-center border-b border-gray-500"
                            // onClick={() => navigate(`detail/${parcel._id}`)}
                          >
                            <div className="w-2/12 text-left py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className="ms-2"> {index + 1}</span>
                            </div>
                            <div className="w-5/12 text-left py-4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-900">
                              {parcel.sellerName}
                            </div>

                            <div className="w-5/12 py-4 text-center text-sm text-gray-900">
                              <span className="me-3">
                                {parcel.sellerTotalSaleAmount} Ks
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-[65vh]">
                <h3 className="font-bold text-xl mb-2">
                  No Data for {selectedMonthData.monthName}{" "}
                  {selectedMonthData.year}
                </h3>
                <p className="text-gray-500">
                  Please select a month and year to view data
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {deliverydata.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=""
              >
                <div className="rounded-2xl overflow-hidden mx-3">
                  <div className="flex w-full bg-white py-2 pb-4 px-2">
                    <div className="w-4/12 py-3 text-color text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                      <span className="ms-2">Date</span>
                    </div>

                    <div className="w-4/12 py-3 text-color text-left text-[13px] font-bold text-gray-500 uppercase">
                      Delivery Name
                    </div>

                    <div className="w-2/12 py-3 text-color text-center text-[13px] uppercase font-bold">
                      <span className="me-3">Done</span>
                    </div>

                    <div className="w-2/12 py-3 text-color text-center text-[13px] uppercase font-bold">
                      <span className="me-3">RTS</span>
                    </div>
                  </div>

                  <div className="w-full bg-white h-[65vh] overflow-y-auto pb-20">
                    {deliverydata.length > 0 &&
                      deliverydata.map((parcel, index) => (
                        <div key={index}>
                          <div
                            className="px-2 w-full bg-white flex hover:bg-gray-50 cursor-pointer items-center border-b border-gray-500"
                            onClick={() =>
                              navigate(`/admin/deliverydetail/${parcel._id}`)
                            }
                          >
                            <div className="w-4/12 text-left py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className="ms-2">
                                {" "}
                                {format(parcel.batchCreatedAt, "dd/ MMMM")}
                              </span>
                            </div>
                            <div className="w-4/12 text-left py-4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-900">
                              {parcel.batchName}
                            </div>

                            <div className="w-2/12 py-4 text-center text-sm text-gray-900">
                              <span className="me-3">
                                {" "}
                                {parcel.successParcelCount}
                              </span>
                            </div>
                            <div className="w-2/12 py-4 text-center text-sm text-gray-900">
                              <span className="me-3">
                                {" "}
                                {parcel.cancelParcelCount}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-[65vh]">
                <h3 className="font-bold text-xl mb-2">No Data</h3>
                <p className="text-gray-500">
                  Please select a month and year to view data
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default SaleReport;
