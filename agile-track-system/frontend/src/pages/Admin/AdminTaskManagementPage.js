import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AdminTaskManagementPage.css";

const AdminTaskManagementPage = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5001/scrumTeams")
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  const updateTaskStatus = (teamId, taskId, newStatus) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        const updatedTasks = team.tasks.map((task) =>
          task.taskId === taskId ? { ...task, status: newStatus } : task
        );

        fetch(`http://localhost:5001/scrumTeams/${teamId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tasks: updatedTasks }),
        })
          .then(() =>
            setTeams(teams.map((t) => (t.id === teamId ? { ...t, tasks: updatedTasks } : t)))
          )
          .catch((error) => console.error("Error updating task:", error));

        return { ...team, tasks: updatedTasks };
      }
      return team;
    });

    setTeams(updatedTeams);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav>
        <Link to="/admin-home">Dashboard</Link> |  
        <Link to="/admin-profile">Profiles</Link> |  
        <button onClick={() => navigate("/login")}>Logout</button>
      </nav>

      {/* Task Management Section */}
      <div className="admin-task-container">
        <h1>Manage Task Status</h1>
        {teams.map((team) => (
          <div key={team.id} className="team-section">
            <h2>{team.name}</h2>
            <ul className="task-list">
              {team.tasks.map((task) => (
                <li key={task.taskId}>
                  <strong>{task.taskName}:</strong> {task.description}
                  <select
                    className="task-status-select"
                    value={task.status}
                    onChange={(e) => updateTaskStatus(team.id, task.taskId, e.target.value)}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTaskManagementPage;
