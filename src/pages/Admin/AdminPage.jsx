import { Route, Routes } from "react-router-dom";
import AccontManagement from "../../components/Admin/AccountManagement/AccontManagement";
import PercelPage from "./../PercelPage";
import Navbar from "../../components/Navbar";
import CreateParcel from "../../components/CreateParcel";

function AdminPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="py-3">
        <Routes>
          <Route path="/acc" element={<AccontManagement />} />
          <Route path="/addpercel" element={<CreateParcel />} />
          <Route path="/report" element={<PercelPage />} />
          <Route path="/" element={<PercelPage />} />
        </Routes>
      </div>
      <div className="fixed bg-white border-t border-gray-200 bottom-0 left-0 right-0">
        <div className="">
          <Navbar />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
