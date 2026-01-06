import { createContext, useContext } from "react";
import { useMeQuery } from "../query/auth.queries";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data, isLoading } = useMeQuery();

  return (
    <AuthContext.Provider
      value={{
        user: data?.user || null,
        permissions: data?.user?.permissions || [],
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
