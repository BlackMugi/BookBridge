import React from "react";
import "./LivreCard.css";
import { useNavigate } from "react-router-dom";

function LivreCard({ livre }) {
    const navigate = useNavigate();

    const goToDetail = (livre) => {
        navigate("/detail", { state: { livre } });
    };

    return (
        <div className="livre-card">
            <div className="card-image-container">
                <img
                    src={`http://localhost:8080/uploads/${livre.imageCouverture}`}
                    alt={livre.titre}
                    className="livre-card-image"
                    onError={(e) => {
                        e.target.onerror = null;
                    }}
                />
            </div>
            <div className="livre-card-content">
                <div className="livre-card-details">
                    <h2 className="livre-titre">{livre.titre}</h2>
                    <p className="livre-auteur">{livre.auteur}</p>
                    <p className="livre-disponibilite">
                        Disponible: {livre.disponibilite}
                    </p>
                </div>
                {/* Afficher le bouton seulement si le livre est disponible */}
                {livre.disponibilite > 0 && (
                    <button onClick={() => goToDetail(livre)} className="btn-voir-detail">
                        Voir Détail
                        <span className="btn-arrow">→</span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default LivreCard;
