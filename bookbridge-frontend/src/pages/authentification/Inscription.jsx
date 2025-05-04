import React, { useState } from "react";
import "../../assets/styles/Auth.css";
import { Link, useNavigate } from "react-router-dom";

function Inscription() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    mot_de_passe: "",
    confirmer_mot_de_passe: "",
  });

  const [messageErreur, setMessageErreur] = useState("");
  const [messageSucces, setMessageSucces] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessageErreur("");
    setMessageSucces("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mot_de_passe !== formData.confirmer_mot_de_passe) {
      setMessageErreur("Les mots de passe ne correspondent pas !");
      return;
    }

    const utilisateur = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      mot_de_passe: formData.mot_de_passe,
      role: "user",
    };

    try {
      const response = await fetch("http://localhost:8080/api/utilisateurs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(utilisateur),
      });

      if (response.ok) {
        setMessageSucces("Inscription réussie ! Vous allez être redirigé vers la page de connexion.");
        setTimeout(() => {
          navigate("/authentification/connexion");
        }, 2000);
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          mot_de_passe: "",
          confirmer_mot_de_passe: "",
        });
        setMessageErreur("");
      } else if (response.status === 409) {
        setMessageErreur("Un compte avec cet email existe déjà.");
      } else {
        const data = await response.text();
        setMessageErreur("Erreur lors de l'inscription : " + data);
      }
    } catch (error) {
      setMessageErreur("Erreur réseau : " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Inscription</h2>

        {messageErreur && (
          <div style={{ color: "red", marginBottom: "10px" }}>{messageErreur}</div>
        )}

        {messageSucces && (
          <div style={{ color: "green", marginBottom: "10px" }}>{messageSucces}</div>
        )}

        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="mot_de_passe"
          placeholder="Mot de passe"
          value={formData.mot_de_passe}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmer_mot_de_passe"
          placeholder="Confirmer mot de passe"
          value={formData.confirmer_mot_de_passe}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">S'inscrire</button>

        <p className="auth-link">
          Vous avez déjà un compte ?{" "}
          <Link to="/authentification/connexion">Connectez-vous ici</Link>
        </p>
      </form>
    </div>
  );
}

export default Inscription;
