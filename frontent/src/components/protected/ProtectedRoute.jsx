import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/Auth.context";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, authChecked } = useAuth();

  if (!authChecked) {
    console.log('loading')
    return <h1> loading </h1>; // or spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
