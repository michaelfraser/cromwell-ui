import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearMessages } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RegisterPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.user);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
    dispatch(clearMessages());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (isLogin) {
      // Simulating a login API call or logic
      console.log("Logging in with:", { email, password });
  
      // Assuming a successful login (replace this with actual login logic)
      const loginSuccess = true; // Replace with actual authentication success condition
  
      if (loginSuccess) {
        navigate("/landing");
      } else {
        console.error("Login failed.");
      }
    } else {
      dispatch(registerUser({ name, email, password }))
        .unwrap()
        .then(() => {
          // Redirect to landing page on successful registration
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
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
