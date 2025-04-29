import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/admin/sidebar/SidebarAdmin";
import "../../assets/styles/GererLivres.css"; 

function GererLivres() {
  const navigate = useNavigate();

  const handleAjouterLivre = () => {
    navigate("/admin/ajouter-un-livre");
  };

  return (
    <div className="admin-container">
      <SidebarAdmin />

      <div className="gerer-livres">
        <div className="header-actions">
          <h1>Gérer les Livres</h1>
          <button className="add-livre-btn" onClick={handleAjouterLivre}>
            Ajouter un Livre
          </button>
        </div>

        <div className="search-box">
          <input type="text" placeholder="Rechercher un livre..." />
          <button className="search-btn-livre">Rechercher</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur</th>
              <th>ISBN</th>
              <th>Catégorie</th>
              <th>Année</th>
              <th>Maison d'Édition</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Le Petit Prince</td>
              <td>Antoine de Saint-Exupéry</td>
              <td>978-1234567890</td>
              <td>Fiction</td>
              <td>1943</td>
              <td>Gallimard</td>
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

export default GererLivres;
