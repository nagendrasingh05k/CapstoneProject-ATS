import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please include an '@' in the email address.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/users?email=${email}`);
      const users = await response.json();

      if (users.length === 0 || users[0].password !== password) {
        setError("Invalid email or password.");
        return;
      }

      const user = users[0];
      navigate(user.role === "admin" ? "/admin-home" : "/user-home");
    } catch (error) {
      setError("Error connecting to server.");
    }
  };

  return (
    <div className="login-container">
      <nav className="login-nav">
        <Link to="/">Dashboard</Link> |  
        <Link to="/login">Login</Link>
      </nav>

      <h1 className="login-header">Login</h1>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>

      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
