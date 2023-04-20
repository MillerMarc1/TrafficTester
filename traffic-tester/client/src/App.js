import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import Graph from "./pages/Graph";

import "./App.css";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </div>
  );
};

export default App;
