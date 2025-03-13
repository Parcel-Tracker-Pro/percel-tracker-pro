import { Route, Routes, useLocation } from "react-router-dom";
import AccontManagement from "../../components/Admin/AccountManagement/AccontManagement";
import PercelPage from "./../../components/Parcel/PercelPage";
import Navbar from "../../components/Navbar";
import CreateParcel from "../../components/Parcel/CreateParcel";
import Delivery from "../../components/Delivery/Delivery";
import CreateDelivery from "../../components/Delivery/CreateDelivery";
import PercelDetail from "../../components/Parcel/ParcelDetail";
import SearchParcel from "../../components/Parcel/SearchParcel";
import DeliveryDetail from "../../components/Delivery/DeliveryDetail";

function AdminPage() {
  const location = useLocation();
  // console.log(location);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="">
        <Routes>
          <Route path="/acc" element={<AccontManagement />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/addpercel" element={<CreateParcel />} />
          <Route path="/report" element={<PercelPage />} />
          <Route path="/" element={<PercelPage />} />
          <Route path="/search" element={<SearchParcel />} />
          <Route path="/detail/:id" element={<PercelDetail />} />
          <Route path="/createdelivery" element={<CreateDelivery />} />
          <Route path="/deliverydetail/:id" element={<DeliveryDetail />} />
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

export default AdminPage;
