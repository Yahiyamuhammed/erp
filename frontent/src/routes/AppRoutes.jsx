import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
// import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../components/protected/ProtectedRoute";
import UserManagementPage from "@/pages/users/UserManagementPage";
import PermissionRoute from "@/components/protected/PermissionRoute";
import UnauthorizedPage from "@/pages/errors/Unauthorized";
import NotFoundPage from "@/pages/errors/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={<ProtectedRoute>{/* <Dashboard /> */}</ProtectedRoute>}
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <PermissionRoute permission="VIEW_USERS">
              <UserManagementPage />
            </PermissionRoute>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
