import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/Detail.css";

function Detail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [jours, setJours] = useState("");

  const livre = state?.livre;

  const handleReserver = () => {
    if (!jours || isNaN(jours) || jours <= 0) {
      alert("Veuillez entrer un nombre de jours valide.");
      return;
    }

    // Ici tu peux envoyer la requête de réservation
    console.log(`Réservation du livre "${livre.titre}" pour ${jours} jours.`);
    alert(`Livre réservé pour ${jours} jours !`);
  };

  if (!livre) {
    return <p style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Aucun livre sélectionné.</p>;
  }

  return (
    <div className="detail-page">
      <div className="detail-container">
        <img src={livre.image} alt={livre.titre} className="detail-image" />
        <div className="detail-info">
          <h1>{livre.titre}</h1>
          <p><strong>Auteur :</strong> {livre.auteur}</p>
          <p><strong>Année :</strong> {livre.annee}</p>
          <p><strong>Maison d'Édition :</strong> {livre.maisonEdition}</p>
          <p><strong>Catégorie :</strong> {livre.categorie}</p>
          <p><strong>ISBN :</strong> {livre.isbn}</p>

          <div className="reservation-input">
            <label htmlFor="jours"><strong>Nombre de jours :</strong></label>
            <input
              type="number"
              id="jours"
              min="1"
              placeholder="Ex : 7"
              value={jours}
              onChange={(e) => setJours(e.target.value)}
            />
          </div>

          <div className="detail-buttons">
            <button className="btn-reserver" onClick={handleReserver}>Réserver</button>
            <button className="btn-retour" onClick={() => navigate(-1)}>Retour</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
