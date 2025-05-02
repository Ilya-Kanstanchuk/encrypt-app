import React from "react";
import { useAuth } from "../context/ContextProvider";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
function About() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="bg-bgcolor min-h-screen">
      <Header />
      <div className="mt-10 flex flex-col items-center">
        <div className="flex">
          <button className="cursor-pointer text-2xl text-picktxtcolor font-semibold bg-pickbgcolor/30 px-10 py-3 rounded-xl">
            ABOUT
          </button>
          <button
            onClick={() => navigate("/start")}
            className="cursor-pointer text-2xl font-semibold text-white px-10 py-3 rounded-xl"
          >
            START
          </button>
        </div>
        <div className="flex flex-col items-center justify-center mt-15 px-50 text-white">
          <div className="r">
            <h1 className="text-6xl font-bold mb-10">
              What is end-to-end encryption ?
            </h1>
            <p className="text-2xl font-medium">
              End-to-end encryption (E2EE) is a security method that ensures
              only the sender and intended recipient can read a message. It
              encrypts data on the sender's device, and it's only decrypted on
              the recipient's device, protecting it from unauthorized access
              during transit and storage. On this web site you can try this out.
              Thanks to the RSA algorithm our users can easily and safety
              encrypt and decrypt messages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
