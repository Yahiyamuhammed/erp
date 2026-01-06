import { createContext, useContext, useEffect, useState } from "react";
import { useAuthMe } from "../hooks/queries/useAuthMe";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data, isSuccess } = useAuthMe();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
  }, [isSuccess, data]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
