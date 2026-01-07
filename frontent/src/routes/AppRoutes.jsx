import { Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import AppLayout from "@/layouts/AppLayout";
import ProtectedRoute from "@/components/protected/ProtectedRoute";
import PermissionRoute from "@/components/protected/PermissionRoute";

import UserManagementPage from "@/pages/users/UserManagementPage";
import UnauthorizedPage from "@/pages/errors/Unauthorized";
import NotFoundPage from "@/pages/errors/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Protected app layout */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route path="/" element={<div>Dashboard</div>} />

        {/* Users */}
        <Route
          path="/users"
          element={
            <PermissionRoute permission="VIEW_USERS">
              <UserManagementPage />
            </PermissionRoute>
          }
        />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
