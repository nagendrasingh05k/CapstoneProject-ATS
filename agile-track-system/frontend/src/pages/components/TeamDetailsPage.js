import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../styles/TeamDetailsPage.css";

const TeamDetailsPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/scrumTeams/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Team with ID ${id} not found`);
        }
        return response.json();
      })
      .then((data) => {
        setTeam(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching team details:", error);
        setError(error.message);
      });
  }, [id]);

  if (error) return <h2 className="error-message">{error}</h2>;
  if (!team) return <h2 className="loading-message">Loading...</h2>;

  return (
    <div className="teamdetails-container">
      <nav className="teamdetails-nav">
        <Link to="/user-home" className="nav-link">Dashboard</Link> 
        <Link to="/user-profile" className="nav-link">Profiles</Link>
        <button onClick={() => navigate("/login")} className="logout-button">Logout</button>
      </nav>

      <h1 className="page-title">Scrum Details for {team.name}</h1>

      <h2 className="section-title">Tasks</h2>
      {team.tasks && team.tasks.length > 0 ? (
        <ul className="details-list">
          {team.tasks.map((task) => (
            <li key={task.taskId} className="task-item">
              <strong>{task.taskName}</strong> - {task.description} ({task.status})
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data">No tasks available.</p>
      )}

      <h2 className="section-title">Users</h2>
      {team.users && team.users.length > 0 ? (
        <ul className="details-list">
          {team.users.map((user) => (
            <li key={user.id || user.userId} className="user-item">
              {user.name || user.userName} - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data">No users assigned.</p>
      )}
    </div>
  );
};

export default TeamDetailsPage;
