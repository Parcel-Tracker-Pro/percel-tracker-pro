// import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/Admin/AdminPage";
import EmployeePage from "./pages/EmployeePage";
import ForgotPassword from "./pages/ForgotPassword";
import { AnimatePresence } from "framer-motion";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AnimatePresence>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee/*"
            element={
              <PrivateRoute>
                <EmployeePage />
              </PrivateRoute>
            }
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
