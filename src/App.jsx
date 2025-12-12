import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <AppRoutes />
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}
