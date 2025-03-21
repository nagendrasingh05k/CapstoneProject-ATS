import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/components/WelcomePage";
import LoginPage from "./pages/Signin/LoginPage";
import SignUpPage from "./pages/Signin/SignUpPage";
import UserHomePage from "./pages/Users/UserHomePage";
import UserProfilePage from "./pages/Users/UserProfilePage";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import AdminProfilesPage from "./pages/Admin/AdminProfilesPage";
import AdminTaskManagementPage from "./pages/Admin/AdminTaskManagementPage";
import AdminTeamDetailsPage from "./pages/Admin/AdminTeamDetailsPage"; 
import TeamDetailsPage from "./pages/components/TeamDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user-home" element={<UserHomePage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/admin-home" element={<AdminHomePage />} />
        <Route path="/admin-profile" element={<AdminProfilesPage />} />
        <Route path="/admin-tasks" element={<AdminTaskManagementPage />} />
        <Route path="/admin/team-details/:id" element={<AdminTeamDetailsPage />} />
        <Route path="/user/team-details/:id" element={<TeamDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
