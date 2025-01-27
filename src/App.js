import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import LandingPage from "./LandingPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route for registration page */}
        <Route path="/" element={<RegisterPage />} />
        {/* Route for landing page */}
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
