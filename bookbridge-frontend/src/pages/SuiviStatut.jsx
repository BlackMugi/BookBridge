import React, { useEffect, useState } from "react";
import "../assets/styles/SuiviStatut.css"; // On va créer ce fichier CSS aussi

function SuiviStatut() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const utilisateurId = localStorage.getItem("utilisateurId");
  
    if (!utilisateurId) {
      console.error("Utilisateur non connecté.");
      return;
    }
  
    fetch(`http://localhost:8080/api/reservations/utilisateur/${utilisateurId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors du chargement des réservations.");
        }
        return res.json();
      })
      .then((data) => {
        setReservations(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);  

  return (
    <div className="suivi-container">
      <h1>Suivi de mes Réservations 📖</h1>
      <table className="suivi-table">
        <thead>
          <tr>
            <th>Livre</th>
            <th>Code Barre</th>
            <th>État</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.livre}</td>
              <td>{res.codeBarre}</td>
              <td>{res.etatExemplaire}</td>
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