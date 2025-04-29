import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Auth.css";

function Connexion() {
  const [formData, setFormData] = useState({
    email: "",
    motDePasse: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Données envoyées :", formData);

    // ➡️ Ici tu ajouteras ton fetch() vers l'API de connexion
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Connexion</h2>

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
          name="motDePasse"
          placeholder="Mot de passe"
          value={formData.motDePasse}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">Se connecter</button>

        {/* Lien pour s'inscrire si pas encore de compte */}
        <p className="auth-link">
          Vous n'avez pas de compte ?{" "}
          <Link to="/authetification/inscription">Inscrivez-vous ici</Link>
        </p>
        
      </form>
    </div>
  );
}

export default Connexion;
