import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import EmployeePage from "./pages/EmployeePage";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
