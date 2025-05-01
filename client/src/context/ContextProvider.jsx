import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

function ContextProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const login = (user, privateKey) => {
    setUser(user);
    setPrivateKey(privateKey);
  };
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    sessionStorage.removeItem("decryptedPrivateKey");
    setPrivateKey(null);
  }
  return (
    <authContext.Provider value={{ user, login, logout, privateKey }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);

export default ContextProvider;
