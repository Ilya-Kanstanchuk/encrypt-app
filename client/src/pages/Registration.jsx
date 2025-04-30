import React from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
function Registration() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-bgcolor">
      <Logo />
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
