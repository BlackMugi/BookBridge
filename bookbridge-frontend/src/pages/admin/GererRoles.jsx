import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../components/admin/sidebar/SidebarAdmin";
import "../../assets/styles/GererLivres.css";
import { FaUserShield, FaUser } from "react-icons/fa"; // Icônes

function GererRoles() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/utilisateurs")
      .then((res) => res.json())
      .then((data) => setUtilisateurs(data))
      .catch((err) => console.error("Erreur chargement utilisateurs:", err));
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const confirmerChangementRole = () => {
    const nouveauRole = selectedUser.role === "user" ? "bibliothecaire" : "user"; // Inverse le rôle
    const requestBody = { role: nouveauRole };

    fetch(`http://localhost:8080/api/utilisateurs/${selectedUser.id}/changer-role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Erreur lors du changement de rôle.");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Rôle changé avec succès :", data);
        setUtilisateurs((prevUtilisateurs) =>
          prevUtilisateurs.map((user) =>
            user.id === data.id ? { ...user, role: data.role } : user
          )
        );
        closeModal();
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  };

  const renderRoleButton = (user) => {
    if (user.email === ADMIN_EMAIL) {
      return <span style={{ color: "#888" }}>Non modifiable</span>;
    }

    let label = "";
    let icon = null;

    if (user.role === "user") {
      label = "Définir Admin";
      icon = <FaUserShield style={{ marginRight: "5px" }} />;
    } else if (user.role === "bibliothecaire") {
      label = "Définir Utilisateur";
      icon = <FaUser style={{ marginRight: "5px" }} />;
    }

    const buttonStyle = {
      backgroundColor: user.role === "user" ? "#28a745" : "#dc3545", // vert ou rouge
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "5px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    };

    return (
      <button style={buttonStyle} onClick={() => openModal(user)}>
        {icon}
        {label}
      </button>
    );
  };

  return (
    <div className="admin-container">
      <SidebarAdmin />
      <div className="gerer-livres">
        <h1>Gérer les Rôles</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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
            {utilisateurs
              .filter((user) =>
                `${user.nom} ${user.prenom} ${user.email}`
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.nom}</td>
                  <td>{user.prenom}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{renderRoleButton(user)}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {showModal && selectedUser && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Confirmation</h2>
              <p>
                Voulez-vous vraiment changer le rôle de{" "}
                <strong>{selectedUser.nom} {selectedUser.prenom}</strong> ?
              </p>
              <div className="modal-buttons">
                <button className="confirm-btn" onClick={confirmerChangementRole}>
                  Confirmer
                </button>
                <button className="cancel-btn" onClick={closeModal}>
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GererRoles;
