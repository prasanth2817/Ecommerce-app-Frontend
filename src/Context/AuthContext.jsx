import React, { createContext, useState, useContext } from "react";

export const AuthDataContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthDataContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthDataContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthDataContext);
};

