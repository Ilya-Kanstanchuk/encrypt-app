import React from "react";
import Logo from "./Logo";
import { useAuth } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center pt-5 pb-10 border-b-1 border-white">
      <div className="ml-5">
        <Logo />
      </div>
      <div className="mr-5 flex gap-4">
        {user ? (
          <>
            <h1 className="text-3xl font-extralight text-white">
              Hello, {user.username}
            </h1>
            <button
              onClick={() => logout()}
              className="px-11 py-1 bg-logcolor rounded-xl text-white font-bold cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-11 py-1 bg-logcolor rounded-xl text-white font-bold cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
