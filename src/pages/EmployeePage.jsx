import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import CreateParcel from "../components/Parcel/CreateParcel";
import PercelPage from "../components/Parcel/PercelPage";
import PercelDetail from "../components/Parcel/ParcelDetail";
// import CreateParcel from "../components/CreateParcel";

function EmployeePage() {
  const location = useLocation();
  console.log(location.pathname.includes("detail"));
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="">
        <Routes>
          <Route path="/detail/:id" element={<PercelDetail />} />
          <Route path="/addpercel" element={<CreateParcel />} />
          <Route path="/" element={<PercelPage />} />
        </Routes>
      </div>

      {!location.pathname.includes("create") &&
        !location.pathname.includes("detail") && (
          <div className="fixed bg-white border-t border-gray-200 bottom-0 left-0 right-0">
            <div className="">
              <Navbar />
            </div>
          </div>
        )}
    </div>
  );
}

export default EmployeePage;
