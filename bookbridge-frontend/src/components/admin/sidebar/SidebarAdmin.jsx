import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/styles/SidebarAdmin.css";

function SidebarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // On vide le localStorage (ou juste enlever le token selon ton système)
    localStorage.removeItem("token");
    localStorage.removeItem("utilisateur");
    localStorage.removeItem("role");

    // Rediriger vers la page de connexion
    navigate("/authentification/connexion");
  };

  return (
    <div className="sidebar-admin">
      <h2 className="bookbridge-admin">BookBridge Admin</h2>
      <nav>
        <ul>
          <li>
            <Link to="/admin/dashboard">🏠 Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/ajouter-un-livre">➕ Ajouter Livre</Link>
          </li>
          <li>
            <Link to="/admin/gerer-un-livre">📚 Gérer Livres</Link>
          </li>
          <li>
            <Link to="/admin/gerer-un-exemplaire">📦 Gérer Exemplaires</Link>
          </li>
          <li>
            <Link to="/admin/gerer-role">👥 Gestion des Rôles</Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-logout">
        <button onClick={handleLogout}>🚪 Déconnexion</button>
      </div>
    </div>
  );
}

export default SidebarAdmin;