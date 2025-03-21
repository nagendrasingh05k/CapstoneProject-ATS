import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/UserProfilePage.css";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const loggedInUserEmail = "user@example.com"; // Replace with actual logged-in user email

  useEffect(() => {
    fetch(`http://localhost:5001/users?email=${loggedInUserEmail}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setUser(data[0]); // Assuming email is unique, get first result
        }
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, []);

  if (!user) return <h2 className="loading-text">Loading...</h2>;

  return (
    <div className="userprofile-container">
      {/* Navigation Bar */}
      <nav className="userprofile-nav">
        <Link to="/user-home" className="nav-link">Dashboard</Link>
        <Link to="/user-profile" className="nav-link">Profiles</Link>
        <button className="logout-button" onClick={() => navigate("/login")}>Logout</button>
      </nav>

      <h1 className="profile-header">User Profiles</h1>
      <h2 className="tasks-header">Tasks Worked By {user.name}</h2>

      <ul className="task-list">
        {user.tasks.length > 0 ? (
          user.tasks.map((task, index) => (
            <li key={index} className="task-card">
              <strong>Title:</strong> {task.taskName} <br />
              <strong>Description:</strong> {task.description} <br />
              <strong>Status:</strong> {task.status}
            </li>
          ))
        ) : (
          <p className="no-tasks">No tasks assigned.</p>
        )}
      </ul>
    </div>
  );
};

export default UserProfilePage;
