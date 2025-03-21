import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/UserHomePage.css";

const UserHomePage = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5001/scrumTeams")
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="userhome-container">
      <nav className="userhome-nav">
        <Link to="/user-home">Dashboard</Link> |  
        <Link to="/user-profile">Profiles</Link>  
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </nav>

      <h1>Welcome to the User home page...</h1>
      <h2>Scrum Teams</h2>

      <ul className="teams-list">
        {teams.map((team) => (
          <li key={team.id}>
            {team.name} 
            <button 
              className="details-button" 
              onClick={() => navigate(`/user/team-details/${team.id}`)}  // ✅ Updated Path
            >
              Get Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserHomePage;
