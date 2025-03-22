import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AdminHomePage.css";

const AdminHomePage = () => {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]); // Stores users for the dropdown
  const [showForm, setShowForm] = useState(false);
  const [newScrum, setNewScrum] = useState({
    name: "",
    taskName: "",
    description: "",
    status: "To Do",
    assignedUser: "",
  });
  const [error, setError] = useState(""); // Stores form validation errors

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5001/scrumTeams")
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching teams:", error));

    fetch("http://localhost:5001/users") // Fetch users for the dropdown
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    setNewScrum({ ...newScrum, [e.target.name]: e.target.value });
  };

  const handleCreateScrum = (e) => {
    e.preventDefault();

    if (!newScrum.name || !newScrum.taskName || !newScrum.description || !newScrum.assignedUser) {
      setError("⚠️ All fields are required!");
      return;
    }

    const newTeam = {
      id: teams.length + 1,
      name: newScrum.name,
      tasks: [
        {
          taskName: newScrum.taskName,
          description: newScrum.description,
          status: newScrum.status,
        },
      ],
      users: [
        {
          userName: newScrum.assignedUser,
          email: `${newScrum.assignedUser.toLowerCase()}@example.com`,
        },
      ],
    };

    fetch("http://localhost:5001/scrumTeams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTeam),
    })
      .then(() => setTeams([...teams, newTeam]))
      .catch((error) => console.error("Error creating scrum:", error));

    setShowForm(false);
    setNewScrum({
      name: "",
      taskName: "",
      description: "",
      status: "To Do",
      assignedUser: "",
    });
    setError(""); // Clear error message
  };

  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <div>
          <Link to="/admin-home" className="nav-link">
            Dashboard
          </Link>
          <Link to="/admin-profile" className="nav-link">
            Profiles
          </Link>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      <h1>Welcome to the Admin Home Page...</h1>

      <h2>Scrum Teams</h2>

      <button onClick={() => setShowForm(true)} className="add-scrum-btn">
        Add New Scrum
      </button>

      {showForm && (
        <form onSubmit={handleCreateScrum} className="scrum-form">
          <h3>Create New Scrum</h3>
          {error && <p className="error-text">{error}</p>} 
          <input
            type="text"
            name="name"
            placeholder="Scrum Name"
            value={newScrum.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="taskName"
            placeholder="Task Title"
            value={newScrum.taskName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Task Description"
            value={newScrum.description}
            onChange={handleInputChange}
            required
          />
          <select name="status" value={newScrum.status} onChange={handleInputChange}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          
          <select name="assignedUser" value={newScrum.assignedUser} onChange={handleInputChange} required>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.userName}>
                {user.userName} ({user.email})
              </option>
            ))}
          </select>

          <button type="submit">Create Scrum</button>
          <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
            Cancel
          </button>
        </form>
      )}

      {/* Scrum Teams List */}
      <ul className="scrum-list">
        {teams.map((team) => (
          <li key={team.id}>
            {team.name}
            <button onClick={() => navigate(`/admin/team-details/${team.id}`)}>Get Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminHomePage;
