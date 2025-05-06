import React from "react";
import SidebarAdmin from "../../components/admin/sidebar/SidebarAdmin";
import "../../assets/styles/Dashboard.css"; 
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="admin-container">
      <SidebarAdmin />

      <div className="dashboard-content">
        <h1>Bienvenue sur le Dashboard Admin</h1>

        <div className="dashboard-cards">

          <Link className="link" to="/admin/ajouter-un-livre">
            <div className="card-admin">
              <h2>➕ Ajouter Livre</h2>
              <p>Ajoutez de nouveaux livres à votre bibliothèque.</p>
            </div>
          </Link>


          <Link className="link" to="/admin/gerer-un-livre">
            <div className="card-admin">
              <h2>📚 Gérer Livres</h2>
              <p>Modifier ou supprimer les livres existants.</p>
            </div>
          </Link>


          <Link className="link" to="/admin/gerer-un-exemplaire">
            <div className="card-admin">
              <h2>📦 Gérer Exemplaires</h2>
              <p>Ajouter ou gérer les exemplaires disponibles.</p>
            </div>
          </Link>


          <Link className="link" to="/admin/gestion-reservation">
            <div className="card-admin">
              <h2>🔄 Réservations</h2>
              <p>Suivre les demandes de réservation.</p>
            </div>      
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;