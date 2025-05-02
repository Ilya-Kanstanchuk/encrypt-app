import React from "react";
import { useAuth } from "../context/ContextProvider";
function About() {
  const { user, privateKey } = useAuth();
  return (
    <div>
      <p>{user.username}</p>
      <p>{privateKey.armor()}</p>
    </div>
  );
}

export default About;
