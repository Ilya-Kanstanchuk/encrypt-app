import React, { useState } from "react";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as openpgp from "openpgp";
import { useAuth } from "../context/ContextProvider";
function Login() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const responce = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });
      if (responce.data.success) {
        const encryptedPrivateKey = localStorage.getItem(
          `privateKey-${username}`
        );
        if (!encryptedPrivateKey) {
          alert("No private key found");
          return;
        }
        const privateKeyObj = await openpgp.readPrivateKey({
          armoredKey: encryptedPrivateKey,
        });
        const decryptedPrivateKey = await openpgp.decryptKey({
          privateKey: privateKeyObj,
          passphrase: password,
        });
        sessionStorage.setItem(
          "decryptedPrivateKey",
          decryptedPrivateKey.armor()
        );
        localStorage.setItem("token", responce.data.token);
        login(responce.data.user, decryptedPrivateKey);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-bgcolor">
      <Logo />
      <div className="bg-formcolor rounded-xl py-10 px-10">
        <div className="flex flex-col items-center justify-center mb-7">
          <h1 className="text-5xl font-semibold">Welcome back!</h1>
          <p className="text-xl font-medium">Login</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="ml-2" htmlFor="username">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter username"
              className="w-full px-5 py-2 bg-white rounded-xl"
              required
            />
          </div>
          <div className="mb-3">
            <label className="ml-2" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              minLength="8"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              className="w-full px-5 py-2 bg-white rounded-xl"
              required
            />
          </div>
          <div className="flex items-center justify-center mt-7  mb-3">
            <button
              type="submit"
              className="py-2 px-15 bg-blue-300 rounded-xl cursor-pointer text-center font-medium"
            >
              Login
            </button>
          </div>
          <div className="flex justify-center items-center">
            <p>
              Don't have an account?
              <Link to="/registration" className="text-blue-500">
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
