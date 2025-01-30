import { Route, Routes } from "react-router-dom";
import AccontManagement from "./AccontManagement";

function AdminPage() {
  return (
    <div className="p-5 bg-gray-100 h-screen">
      <Routes>
        <Route path="/" element={<AccontManagement />} />
      </Routes>
    </div>
  );
}

export default AdminPage;
