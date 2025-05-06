import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/Detail.css";

function Detail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [jours, setJours] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState({ success: false, message: "" });

  const livre = state?.livre;

  const handleReserver = () => {
    const joursNum = parseInt(jours, 10);

    // Vérification de la validité du nombre de jours
    if (!jours || isNaN(joursNum) || joursNum <= 0 || joursNum > 15) {
      setPopupMessage({ success: false, message: "Veuillez entrer un nombre de jours valide (entre 1 et 15)." });
      setShowPopup(true);
      return;
    }

    // Vérification de la disponibilité d'un exemplaire
    const exemplaireDisponible = livre.exemplaires?.find(
      (ex) => ex.disponibilite === true || ex.disponibilite === 1
    );

    if (!exemplaireDisponible) {
      setPopupMessage({ success: false, message:"Aucun exemplaire disponible pour ce livre."});
      setShowPopup(true);
      return;
    }

    // Récupérer l'ID utilisateur depuis localStorage
    const utilisateurId = localStorage.getItem("utilisateurId");

    // Vérification si l'utilisateur est connecté
    if (!utilisateurId) {
      setPopupMessage({ success: false, message:"Utilisateur non connecté."});
      setShowPopup(true);
      return;
    }

    // Envoi de la requête de réservation
    fetch("http://localhost:8080/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        livreId: livre.id,
        utilisateurId: utilisateurId,
        jours: joursNum,
      }),      
    })

      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la réservation.");
        }
        return res.json();
      })


      .then((data) => {
        setPopupMessage({
          success: true,
          message: `Réservation réussie jusqu'au ${data.dateFin}`,
        });
        setShowPopup(true);
      })
      
      .catch((err) => {
        console.error(err);
        setPopupMessage({ success: false, message:"Échec de la réservation. Veuillez réessayer."});
        setShowPopup(true);
      });
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
            <p className="popup-icon">
              {popupMessage.success ? "✅" : "❌"}
            </p>
            <p>{popupMessage.message}</p>
            <button
              onClick={() => {
                setShowPopup(false);
                if (popupMessage.success) {
                  navigate("/suivi-du-statut");
                }
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
