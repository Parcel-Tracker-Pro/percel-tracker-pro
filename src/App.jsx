// import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/Admin/AdminPage";
import EmployeePage from "./pages/EmployeePage";
import ForgotPassword from "./pages/ForgotPassword";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <AnimatePresence>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/employee/*" element={<EmployeePage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
