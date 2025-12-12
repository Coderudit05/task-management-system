import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login.jsx";
import Admin from "../pages/admin/Admin.jsx";
import Employee from "../pages/employee/Employee.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/employee" element={<Employee />} />
    </Routes>
  );
}
