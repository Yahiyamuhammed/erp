import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
// import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../components/protected/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            {/* <Dashboard /> */}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
