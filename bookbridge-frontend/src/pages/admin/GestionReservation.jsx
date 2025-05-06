import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/sidebar/SidebarAdmin";
import "../../assets/styles/GererLivres.css";

function GestionReservation() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/reservations")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des réservations");
        return res.json();
      })
      .then((data) => {
        setReservations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des réservations...</p>;

  return (
    <div className="admin-container">
        <SidebarAdmin />
        <div className="gerer-livres">

            <div className="header-actions">
                <h1>Liste des Réservations</h1>
            </div>

            {reservations.length === 0 ? (
                <p>Aucune réservation trouvée</p>

            ) : (
                <table>
                <thead>
                    <tr>
                    <th>Utilisateur</th>
                    <th>Livre</th>
                    <th>Date début</th>
                    <th>Date fin</th>
                    <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((res) => (
                    <tr key={res.id}>
                        <td>{res.emailUtilisateur || "Inconnu"}</td>
                        <td>{res.livre || "Inconnu"}</td>

                        <td>{res.dateDebut}</td>
                        <td>{res.dateFin}</td>
                        <td>{res.statut}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
        </div>
    </div>
  );
}

export default GestionReservation;
