import { useAuth } from "@/context/Auth.context";
import { Navigate } from "react-router-dom";


export default function PermissionRoute({ permission, children }) {
  const { isAuthenticated, permissions, authChecked } = useAuth();

  console.log(permission,'and',permissions)

  if (!authChecked) {
      console.log('loading from permission route')
      
    return null;
}

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!permissions.includes(permission)) {
    console.log('perm not incuded')
    return <Navigate to="/" replace />;
  }

  return children;
}
