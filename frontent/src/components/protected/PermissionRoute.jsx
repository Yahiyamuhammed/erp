import { useAuth } from "@/context/Auth.context";
import { Navigate } from "react-router-dom";

export default function PermissionRoute({ permission, children }) {
  const { isAuthenticated, permissions, authChecked } = useAuth();
  if (!authChecked) {
    return <h1> loading </h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!permissions.includes(permission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
