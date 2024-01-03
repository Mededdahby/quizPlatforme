import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
