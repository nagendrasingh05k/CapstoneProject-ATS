import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/WelcomePage.css";


const WelcomePage = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5001/scrumTeams")
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link>  |  
        <Link to="/login">Login</Link>
      </nav>

      <h1>Welcome to Agile Track System</h1>
      <h2>Scrum Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            {team.name} 
            <button onClick={() => navigate("/login")}>Get Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WelcomePage;
