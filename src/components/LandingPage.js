import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { jwtDecode } from 'jwt-decode';
import getBaseUrl from '../utils/getBaseUrl';

export default function LandingPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [userName, setUserName] = useState(null);
  const [error, setError] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const state = useSelector((state) => state.user);
  const token = state && state.user ? state.user.token : null;
  
  let userId = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.userId;
  }

  useEffect(() => {
    if (userId) {
      fetch(getBaseUrl() + `/user/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching user: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => setUserName(data.name))
        .catch((err) => setError(err.message));
    }
  }, [userId]);

  const handleLogout = () => {
    console.log("Logout triggered");
    dispatch(logout());
    navigate("/");
  };

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
        {error ? (
          <h2>Error: {error}</h2>
        ) : userName ? (
          <h1>Welcome, {userName}! 🎉</h1>
        ) : (
          <h1>Loading user information...</h1>
        )}
      </div>
    </div>
  );
}
