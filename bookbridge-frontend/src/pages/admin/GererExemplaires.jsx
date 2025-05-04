import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ← à ajouter
import SidebarAdmin from "../../components/admin/sidebar/SidebarAdmin";
import "../../assets/styles/GererLivres.css";

function GererExemplaires() {
  const [exemplaires, setExemplaires] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // ← hook de navigation

  const fetchExemplaires = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/exemplaires");
      const data = await response.json();
      setExemplaires(data);
    } catch (error) {
      console.error("Erreur de récupération des exemplaires :", error);
    }
  };

  const handleSupprimer = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/exemplaires/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Exemplaire supprimé.");
        fetchExemplaires();
      }
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  const handleModifier = (id) => {
    navigate(`/admin/modifier-un-exemplaire/${id}`);
  };

  useEffect(() => {
    fetchExemplaires();
  }, []);

  const filteredExemplaires = exemplaires.filter((ex) =>
    ex.codeBarre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <SidebarAdmin />
      <div className="gerer-livres">
        <h1>Gérer les Exemplaires</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher par code-barres..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Code-barres</th>
              <th>Titre du Livre</th>
              <th>Disponibilité</th>
              <th>Etat</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExemplaires.length > 0 ? (
              filteredExemplaires.map((ex) => (
                <tr key={ex.id}>
                  <td>{ex.codeBarre}</td>
                  <td>{ex.titreLivre}</td>
                  <td>{ex.disponibilite}</td>
                  <td>{ex.etat}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleModifier(ex.id)}
                    >
                      Modifier
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleSupprimer(ex.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Aucun exemplaire trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GererExemplaires;
