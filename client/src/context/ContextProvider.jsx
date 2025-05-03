import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as openpgp from "openpgp";

const authContext = createContext();

function ContextProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [loading, setLoading] = useState(true);
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
  async function verifyUser() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const responce = await axios.get(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (responce.data.success) {
        setUser(responce.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function verifyPrivateKey() {
    const armored = sessionStorage.getItem("decryptedPrivateKey");
    if (armored) {
      const key = await openpgp.readPrivateKey({ armoredKey: armored });
      setPrivateKey(key);
    } else {
      logout();
    }
  }
  async function verifyBoth() {
    await verifyUser();
    await verifyPrivateKey();
    setLoading(false);
  }
  useEffect(() => {
    verifyBoth();
  }, []);

  if (loading) return <div>Loading secure session...</div>;

  return (
    <authContext.Provider value={{ user, login, logout, privateKey }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);

export default ContextProvider;
