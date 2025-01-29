import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearMessages, loginUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { login } from '../redux/authSlice';

export default function RegisterPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState(""); // To store email error
  const [passwordErrors, setPasswordErrors] = useState([]); // To store password errors

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.user);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
    setEmailError("");
    setPasswordErrors([]);
    dispatch(clearMessages());
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Check if email is valid
    if (inputEmail && !validateEmail(inputEmail)) {
      setEmailError("Invalid email format. Example: you@example.com");
    } else {
      setEmailError(""); // Clear error if email is valid
    }
  };

  // Password validation function
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }
    return errors;
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    const errors = validatePassword(inputPassword);
    setPasswordErrors(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      dispatch(loginUser({ email, password }))
        .unwrap()
        .then(() => {
          dispatch(login());
          navigate("/landing");
        })
        .catch((err) => {
          console.error("Login failed:", err);
        });
    } else {
      const errors = validatePassword(password);
      if (emailError || errors.length > 0) {
        return; // Prevent form submission if there are validation errors
      }

      dispatch(registerUser({ name, email, password }))
        .unwrap()
        .then(() => {
          navigate("/landing");
        })
        .catch((err) => {
          console.error("Registration failed:", err);
        });
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-sm" style={{ width: "24rem" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">
            {isLogin ? "Login" : "Register"}
          </h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {/* Display email error */}
              {emailError && (
                <div className="text-danger mt-1" style={{ fontSize: "0.875rem" }}>
                  {emailError}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="********"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {/* Display password validation errors */}
              {!isLogin && passwordErrors.length > 0 && (
                <ul className="text-danger mt-2" style={{ fontSize: "0.875rem" }}>
                  {passwordErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Login" : "Register"}
            </button>
          </form>
          <p className="text-center mt-3">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={handleSwitch}
              className="btn btn-link p-0 text-decoration-none ms-1"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
