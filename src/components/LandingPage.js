import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout triggered"); // Add this to confirm the click handler works

    dispatch(logout());
    navigate("/");
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log('isAuthenticated='+isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }  

  return (
    <div className="min-vh-100 d-flex flex-column bg-light position-relative">
      {/* Logout Button */}
      <div className="position-absolute top-0 end-0 m-3">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <h1>Welcome to the Landing Page! 🎉</h1>
      </div>
    </div>
  );
}
