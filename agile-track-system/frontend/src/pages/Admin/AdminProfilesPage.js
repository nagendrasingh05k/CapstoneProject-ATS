import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AdminProfilesPage.css";

const AdminProfilesPage = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "user" });
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5001/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("All fields are required!");
      return;
    }

    const newUserObj = { id: users.length + 1, ...newUser, tasks: [] };

    fetch("http://localhost:5001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserObj),
    })
      .then(() => setUsers([...users, newUserObj]))
      .catch((error) => console.error("Error adding user:", error));

    setShowForm(false);
    setNewUser({ name: "", email: "", password: "", role: "user" });
  };

  return (
    <div className="admin-profiles-container">
      {/* Navigation Bar */}
      <nav className="admin-nav">
        <Link to="/admin-home" className="nav-link">Dashboard</Link>  
        <Link to="/admin-profile" className="nav-link">Profiles</Link>  
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </nav>

      {/* Page Header */}
      <h1 className="admin-header">User Profiles</h1>

      {/* Add User Button */}
      <button className="add-user-button" onClick={() => setShowForm(true)}>Add New User</button>

      {/* User Creation Form */}
      {showForm && (
        <form className="user-form" onSubmit={handleCreateUser}>
          <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} required />
          <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleInputChange} required />
          <select name="role" value={newUser.role} onChange={handleInputChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div className="form-buttons">
            <button className="submit-button" type="submit">Create User</button>
            <button className="cancel-button" type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      {/* Users List */}
      <ul className="users-list">
        {users.map((user) => (
          <li className="user-card" key={user.id}>
            <span className="user-name">{user.name}</span> (<span className="user-email">{user.email}</span>)
            <button className="history-button" onClick={() => setSelectedUser(user)}>Get History</button>
          </li>
        ))}
      </ul>

      {/* Task History Section */}
      {selectedUser && (
        <div className="task-history-container">
          <h2 className="task-history-header">Tasks Worked By {selectedUser.name}</h2>
          <ul className="task-list">
            {selectedUser.tasks.length > 0 ? (
              selectedUser.tasks.map((task, index) => (
                <li className="task-card" key={index}>
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
      )}
    </div>
  );
};

export default AdminProfilesPage;
