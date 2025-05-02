import React from "react";
import { Link } from "react-router-dom";
function Logo() {
  return (
    <Link to="/" className="font-mono text-5xl">
      <span className="text-blue-300">.E</span>
      <span className="text-white">ncrypt_</span>
    </Link>
  );
}

export default Logo;
