import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Graph from "./pages/Graph";
import Edit from "./pages/Edit";
import Save from "./pages/Save";
import Load from "./pages/Load";

import "./App.css";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/save" element={<Save />} />
        <Route path="/load" element={<Load />} />
      </Routes>
    </div>
  );
};

export default App;
