// context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("bbsUser");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (data) => {
    localStorage.setItem("bbsUser", JSON.stringify(data));
    localStorage.setItem("token", data.token);
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("bbsUser");
    localStorage.removeItem("token");
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
