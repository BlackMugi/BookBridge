import React from "react";
import SidebarAdmin from "../../components/admin/sidebar/SidebarAdmin";
import "../../assets/styles/GererLivres.css";

function GererExemplaires() {
  return (
    <div className="admin-container">
      <SidebarAdmin />

      <div className="gerer-livres">
        {/* Juste le titre seul, sans bouton */}
        <h1>Gérer les Exemplaires</h1>
        <div className="search-box">
          <input type="text" placeholder="Rechercher par code-barres..." />
          <button className="search-btn-livre">Rechercher</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Code-barres</th>
              <th>Titre du Livre</th>
              <th>Disponibilité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CB1234567890</td>
              <td>Le Petit Prince</td>
              <td>Disponible</td>
              <td>
                <button className="edit-btn">Modifier</button>
                <button className="delete-btn">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GererExemplaires;
