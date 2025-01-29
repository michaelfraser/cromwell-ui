import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "../components/RegisterPage";
import LandingPage from "../components/LandingPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Route for registration page */}
      <Route path="/" element={<RegisterPage />} />
      {/* Route for landing page */}
      <Route path="/landing" element={<LandingPage />} />
    </Routes>
  );
}
