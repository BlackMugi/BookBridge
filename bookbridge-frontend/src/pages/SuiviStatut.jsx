import React, { useEffect, useState } from "react";
import "../assets/styles/SuiviStatut.css"; // On va créer ce fichier CSS aussi

function SuiviStatut() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Simuler l'appel API (on remplacera plus tard par un vrai fetch)
    const fakeReservations = [
      { id: 1, livre: "Le Petit Prince", dateDebut: "2025-05-01", dateFin: "2025-05-10", statut: "En cours" },
      { id: 2, livre: "L'Alchimiste", dateDebut: "2025-04-15", dateFin: "2025-04-25", statut: "Terminée" },
      { id: 3, livre: "1984", dateDebut: "2025-05-05", dateFin: "2025-05-15", statut: "En attente" },
    ];
    setReservations(fakeReservations);
  }, []);

  return (
    <div className="suivi-container">
      <h1>Suivi de mes Réservations 📖</h1>
      <table className="suivi-table">
        <thead>
          <tr>
            <th>Livre</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.livre}</td>
              <td>{res.dateDebut}</td>
              <td>{res.dateFin}</td>
              <td className={`statut ${res.statut.replace(" ", "-").toLowerCase()}`}>{res.statut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SuiviStatut;