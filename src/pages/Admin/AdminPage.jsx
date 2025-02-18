import { Route, Routes } from "react-router-dom";
import AccontManagement from "../../components/Admin/AccountManagement/AccontManagement";
import PercelPage from "./../PercelPage";
import Navbar from "../../components/Navbar";

function AdminPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-5">
        <Routes>
          <Route path="/acc" element={<AccontManagement />} />
          <Route path="/addpercel" element={<PercelPage />} />
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
