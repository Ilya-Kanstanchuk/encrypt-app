import React, { useState } from "react";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as openpgp from "openpgp";

function Registration() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const { privateKey, publicKey } = await openpgp.generateKey({
      type: "rsa",
      rsaBits: 2048,
      userIDs: [{ name: username }],
      passphrase: password,
    });
    try {
      const response = await axios.post(`${API_URL}/auth/registration`, {
        username,
        password,
        email,
        publicKey,
      });
      if (response.data.success) {
        localStorage.setItem(`privateKey-${username}`, privateKey);
        navigate("/login");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-bgcolor">
      <div className="fixed top-5 left-5">
        <Logo />
      </div>
      <div className="bg-formcolor rounded-xl py-10 px-10">
        <div className="flex flex-col items-center justify-center mb-7">
          <h1 className="text-5xl font-semibold">Welcome!</h1>
          <p className="text-xl font-medium">Create an account</p>
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
            <label className="ml-2" htmlFor="email">
              E-mail
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter e-mail"
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
          <div className="flex flex-col items-center justify-center mt-7  mb-3">
            {errorMessage && (
              <div className="text-red-600 text-[17px] text-center mb-4">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className="py-2 px-15 bg-blue-300 rounded-xl cursor-pointer text-center font-medium"
            >
              Create
            </button>
          </div>
          <div className="flex justify-center items-center">
            <p>
              Already have an account?
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
