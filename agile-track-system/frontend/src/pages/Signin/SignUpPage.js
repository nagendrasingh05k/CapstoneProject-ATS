import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/SignUpPage.css";


const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please include an '@' in the email address.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/users?email=${email}`);
      const existingUsers = await response.json();

      if (existingUsers.length > 0) {
        setError("Email already registered. Please use a different email.");
        return;
      }

      await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "user" }),
      });

      navigate("/user-home");
    } catch (error) {
      setError("Error connecting to server.");
    }
  };

  return (
    <div className="signup-container">
      {/* Navigation Bar */}
      <nav className="signup-nav">
        <Link to="/">Dashboard</Link>
        <Link to="/login">Login</Link>
      </nav>

      <h1>Sign Up</h1>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          className="signup-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="signup-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="signup-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
