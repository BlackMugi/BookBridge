import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/Detail.css";

function Detail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [jours, setJours] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const livre = state?.livre;

  const handleReserver = () => {
    const joursNum = parseInt(jours, 10);

    if (!jours || isNaN(joursNum) || joursNum <= 0 || joursNum > 15) {
      setPopupMessage("Veuillez entrer un nombre de jours valide (entre 1 et 15).");
      setShowPopup(true);
      return;
    }

    const exemplaireDisponible = livre.exemplaires?.find(
      (ex) => ex.disponibilite === true || ex.disponibilite === 1
    );

    if (!exemplaireDisponible) {
      setPopupMessage("Aucun exemplaire disponible pour ce livre.");
      setShowPopup(true);
      return;
    }

    const utilisateurId = localStorage.getItem("utilisateurId");

    if (!utilisateurId) {
      setPopupMessage("Utilisateur non connecté.");
      setShowPopup(true);
      return;
    }

    fetch("http://localhost:8080/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        exemplaireId: exemplaireDisponible.id,
        utilisateurId,
        jours: joursNum,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la réservation.");
        return res.json();
      })
      .then((data) => {
        setPopupMessage(`Réservation réussie jusqu'au ${data.dateFin}`);
        setShowPopup(true);
      })
      .catch((err) => {
        console.error(err);
        setPopupMessage("Échec de la réservation. Veuillez réessayer.");
        setShowPopup(true);
      });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!livre) {
    return (
      <p style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
        Aucun livre sélectionné.
      </p>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-container">
        <img
          src={`http://localhost:8080/uploads/${livre.imageCouverture}`}
          alt={livre.titre}
          className="detail-image"
        />
        <div className="detail-info">
          <h1>{livre.titre}</h1>
          <p><strong>Auteur :</strong> {livre.auteur}</p>
          <p><strong>Année :</strong> {livre.anneePublication}</p>
          <p><strong>Maison d'Édition :</strong> {livre.maisonEdition}</p>
          <p><strong>Catégorie :</strong> {livre.categorie}</p>
          <p><strong>ISBN :</strong> {livre.isbn}</p>

          <div className="reservation-input">
            <label htmlFor="jours"><strong>Nombre de jours :</strong></label>
            <input
              type="number"
              id="jours"
              min="1"
              max="15"
              placeholder="Max 15"
              value={jours}
              onChange={(e) => setJours(e.target.value)}
            />
          </div>

          <div className="detail-buttons">
            <button className="btn-reserver" onClick={handleReserver}>
              Réserver
            </button>
            <button className="btn-retour" onClick={() => navigate(-1)}>
              Retour
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>{popupMessage}</p>
            <button onClick={closePopup}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
