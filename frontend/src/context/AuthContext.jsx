import { createContext, useContext, useState } from "react";

// 1. Create context
const AuthContext = createContext();

// 2. Wrap all app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null মানে logged out

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook
export const useAuth = () => useContext(AuthContext);