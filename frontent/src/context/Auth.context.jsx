import { createContext, useContext, useEffect, useState } from "react";
import { useAuthMe } from "../hooks/queries/useAuthMe";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data, isLoading, isSuccess, isError } = useAuthMe();
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (isSuccess && data?.user) {
      setUser(data.user);
      setAuthChecked(true);
    }

    if (isError) {
      setUser(null);
      setAuthChecked(true);
    }
  }, [isSuccess, isError, data]);

  const value = {
    user,
    permissions: user?.permissions || [],
    isAuthenticated: !!user,
    authChecked,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
