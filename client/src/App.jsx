import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
