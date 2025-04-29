import React, { useState } from "react";
import SidebarAdmin from "../../components/admin/sidebar/SidebarAdmin";
import "../../assets/styles/GererLivres.css"; // On garde le même style

function GererRoles() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const utilisateurs = [
    { id: 1, nom: "Ndoye", prenom: "Fatou", email: "fatou.ndoye@example.com", role: "user" },
    { id: 2, nom: "Ba", prenom: "Amadou", email: "amadou.ba@example.com", role: "bibliothecaire" },
    // D'autres utilisateurs...
  ];

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const confirmerChangementRole = () => {
    console.log("Changement de rôle pour :", selectedUser);
    // ➡️ Ici, tu pourras appeler ton API pour vraiment changer dans la BDD
    closeModal();
  };

  return (
    <div className="admin-container">
      <SidebarAdmin />

      <div className="gerer-livres">
        <h1>Gérer les Rôles</h1>

        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {utilisateurs.map((user) => (
              <tr key={user.id}>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="edit-btn" onClick={() => openModal(user)}>
                    Changer Rôle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Confirmation</h2>
              <p>
                Voulez-vous vraiment changer le rôle de{" "}
                <strong>{selectedUser.nom} {selectedUser.prenom}</strong> ?
              </p>
              <div className="modal-buttons">
                <button className="confirm-btn" onClick={confirmerChangementRole}>Confirmer</button>
                <button className="cancel-btn" onClick={closeModal}>Annuler</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GererRoles;
