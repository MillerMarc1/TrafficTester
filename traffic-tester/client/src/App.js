import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
