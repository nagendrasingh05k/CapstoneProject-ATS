import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../styles/AdminTeamDetailsPage.css";

const AdminTeamDetailsPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/scrumTeams/${id}`)
      .then((response) => response.json())
      .then((data) => setTeam(data))
      .catch((error) => console.error("Error fetching team details:", error));
  }, [id]);

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = team.tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    fetch(`http://localhost:5001/scrumTeams/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks: updatedTasks }),
    })
      .then(() => setTeam({ ...team, tasks: updatedTasks }))
      .catch((error) => console.error("Error updating task:", error));
  };

  if (!team) return <h2 className="loading-text">Loading...</h2>;

  return (
    <div className="admin-team-container">
      {/* Navigation Bar */}
      <nav className="admin-nav">
        <div>
          <Link to="/admin-home" className="nav-link">Dashboard</Link> |
          <Link to="/admin-profile" className="nav-link">Profiles</Link>
        </div>
        <button className="logout-button" onClick={() => navigate("/login")}>Logout</button>
      </nav>

      {/* Team Details Section */}
      <div className="team-details">
        <h1 className="team-name">Scrum Details for {team.name}</h1>

        {/* Tasks Section */}
        <h2>Tasks</h2>
        <ul className="task-list">
          {team.tasks.map((task) => (
            <li key={task.id} className="task-item">
              <strong>{task.taskName}</strong> - {task.description}
              <select
                className="task-status-select"
                value={task.status}
                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </li>
          ))}
        </ul>

        {/* Users Section */}
        <h2>Users</h2>
        <ul className="user-list">
          {team.users.map((user, index) => (
            <li key={index} className="user-item">
              <strong>{user.userName}</strong> - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminTeamDetailsPage;
