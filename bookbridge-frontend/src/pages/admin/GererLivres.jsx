import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/admin/sidebar/SidebarAdmin";
import "../../assets/styles/GererLivres.css";

function GererLivres() {
  const navigate = useNavigate();
  const [livres, setLivres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAjouterLivre = () => {
    navigate("/admin/ajouter-un-livre");
  };

  const handleModifier = (id) => {
    navigate(`/admin/modifier-un-livre/${id}`);
  };

  const fetchLivres = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/livres");
      const data = await response.json();
      setLivres(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des livres :", error);
    }
  };

  const handleSupprimer = async (id) => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce livre ? Cette action est irréversible.");
    if (!confirmation) return;

    try {
      const response = await fetch(`http://localhost:8080/api/livres/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Livre supprimé avec succès.");
        fetchLivres(); 
      } else {
        alert("Erreur lors de la suppression du livre.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchLivres();
  }, []);

  // Filtrer les livres en fonction du terme de recherche
  const filteredLivres = livres.filter((livre) =>
    livre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    livre.auteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
    livre.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <input
            type="text"
            placeholder="Rechercher un livre..."
            value={searchTerm}
            onChange={handleSearchChange} 
          />
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
            {filteredLivres.length > 0 ? (
              filteredLivres.map((livre) => (
                <tr key={livre.id}>
                  <td>{livre.titre}</td>
                  <td>{livre.auteur}</td>
                  <td>{livre.isbn}</td>
                  <td>{livre.categorie}</td>
                  <td>{livre.anneePublication}</td>
                  <td>{livre.maisonEdition}</td>
                  <td className="button-contain">
                    <button className="edit-btn" onClick={() => handleModifier(livre.id)}>Modifier</button>
                    <button className="delete-btn" onClick={() => handleSupprimer(livre.id)}>Supprimer</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>Aucun livre trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GererLivres;
