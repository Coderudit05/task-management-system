import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login.jsx";
import Admin from "../pages/admin/Admin.jsx";
import Employee from "../pages/employee/Employee.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes Login because user is not logged in */}

      <Route
        path="/login"
        element={
          user ? (
            <Navigate
              to={user.role === "admin" ? "/admin" : "/employee"}
              replace
            />
          ) : (
            <Login />
          )
        }
      />

      {/* Protected Route : Admin Dashboard */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <Admin />
          </ProtectedRoute>
        }
      />

      {/* Protected Route : Employee Dashboard */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute requiredRole="employee">
            <Employee />
          </ProtectedRoute>
        }
      />

      {/* Default Route: Root Path */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate
              to={user.role === "admin" ? "/admin" : "/employee"}
              replace
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Catch All : Invalid Routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
