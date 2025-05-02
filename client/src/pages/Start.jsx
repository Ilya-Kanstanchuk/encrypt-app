import React from "react";
import { useAuth } from "../context/ContextProvider";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
function Start() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="bg-bgcolor min-h-screen">
      <Header />
      <div className="mt-10 flex flex-col items-center">
        <div className="flex">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer text-2xl font-semibold text-white px-10 py-3 rounded-xl"
          >
            ABOUT
          </button>
          <button className="cursor-pointer text-2xl text-picktxtcolor font-semibold bg-pickbgcolor/30 px-10 py-3 rounded-xl">
            START
          </button>
        </div>
      </div>
    </div>
  );
}

export default Start;
