import { createContext, useContext, useState, useEffect } from "react";
import {
  getLocalData,
  setLocalData,
  removeLocalData,
} from "../utils/localStorage";

// 1) Create AuthContext
const AuthContext = createContext();

// 2) Provider Component
export function AuthProvider({ children }) {
  // --- USER STATE (RESTORED FROM LOCALSTORAGE) ---
  const [user, setUser] = useState(() => getLocalData("user"));

  // --- LOADING STATE (PREVENT UI FLICKER ON FIRST LOAD) ---
  const [loading, setLoading] = useState(true);

  // Stop loading once initial check is done
  useEffect(() => {
    setLoading(false);
  }, []);

  // --- LOGIN FUNCTION ---
  const login = (data) => {
    setUser(data);
    setLocalData("user", data);
  };

  // --- LOGOUT FUNCTION ---
  const logout = () => {
    setUser(null);
    removeLocalData("user");
  };

  // --- PROVIDER VALUES ---
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3) Custom Hook
export const useAuth = () => useContext(AuthContext);
