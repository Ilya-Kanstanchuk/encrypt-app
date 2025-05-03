import React, { useState } from "react";
import { useAuth } from "../context/ContextProvider";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import icon from "../assets/searchi.png";
import axios from "axios";
import * as openpgp from "openpgp";
function Start() {
  const [userMessage, setUserMessage] = useState();
  const [username, setUsername] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageToSend, setMessageToSend] = useState("");
  const [messageToDecrypt, setMessageToDecrypt] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const { privateKey } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  async function encryptMessage() {
    const pk = await openpgp.readKey({
      armoredKey: publicKey,
    });
    const encrypted = await openpgp.encrypt({
      message: await openpgp.createMessage({ text: userMessage }),
      encryptionKeys: pk,
    });
    setMessageToSend(encrypted);
  }
  async function decryptMessage() {
    try {
      const message = await openpgp.readMessage({
        armoredMessage: messageToDecrypt,
      });

      const { data: decryptedText } = await openpgp.decrypt({
        message,
        decryptionKeys: privateKey,
      });
      setDecryptedMessage(decryptedText);
    } catch (error) {
      console.log(error);
      setDecryptedMessage("WARNING: INVALID MESSAGE");
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/encrypt/find`, {
        params: { username },
      });
      console.log(response);
      if (response.data.success) {
        setErrorMessage("");
        setPublicKey(response.data.publicKey);
      }
    } catch (error) {
      console.log(error);
      setPublicKey("");
      setErrorMessage(error.response.data.message);
    }
  }
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
      <div className="px-30 py-10 flex gap-30">
        <div>
          <h2 className="text-white text-4xl font-semibold mb-8">Encrypt</h2>
          <form onSubmit={handleSubmit} className="flex">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-white text-xl mb-3">
                Who do you want to encrypt the message for?(find by username){" "}
              </label>
              <div className="relative w-[300px]">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  required
                  className="w-full bg-white text-center py-2 px-8 rounded-xl text-xl font-medium focus:outline-none"
                />
                <button
                  type="submit"
                  className="cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 w-6 h-6"
                >
                  <img className="w-full h-full" src={icon} alt="" />
                </button>
              </div>
              {errorMessage && (
                <div className="text-red-600 text-[17px] mb-4 mt-5">
                  {errorMessage}
                </div>
              )}
            </div>
          </form>
          {publicKey && (
            <div className="flex mt-5">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <label htmlFor="" className="text-white text-xl mb-3">
                    Your message to {username}
                  </label>
                  <div className="flex items-start gap-4">
                    <textarea
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      className="bg-white w-[300px] py-2 px-8 rounded-xl text-xl font-medium focus:outline-none"
                      name=""
                      id="message"
                      rows={6}
                    ></textarea>
                    <button
                      onClick={encryptMessage}
                      className="px-11 py-1 bg-logcolor rounded-xl text-white font-bold cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <div className="flex flex-col mt-8">
                  <label htmlFor="" className="text-white text-xl mb-3">
                    Encrypted message
                  </label>
                  <textarea
                    value={messageToSend}
                    className="bg-white w-[300px] py-2 px-8 rounded-xl text-xl font-medium focus:outline-none"
                    name=""
                    id="message"
                    rows={6}
                  ></textarea>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-white text-4xl font-semibold mb-8">Decrypt</h2>
          <div className="flex mt-5">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <label htmlFor="" className="text-white text-xl mb-3">
                  Encrypted message
                </label>
                <div className="flex items-start gap-4">
                  <textarea
                    value={messageToDecrypt}
                    onChange={(e) => setMessageToDecrypt(e.target.value)}
                    className="bg-white w-[300px] py-2 px-8 rounded-xl text-xl font-medium focus:outline-none"
                    name=""
                    id="message"
                    rows={6}
                  ></textarea>
                  <button
                    onClick={decryptMessage}
                    className="px-11 py-1 bg-logcolor rounded-xl text-white font-bold cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <label htmlFor="" className="text-white text-xl mb-3">
                  Decrypted message
                </label>
                <textarea
                  value={decryptedMessage}
                  className="bg-white w-[300px] py-2 px-8 rounded-xl text-xl font-medium focus:outline-none"
                  name=""
                  id="message"
                  rows={6}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;
