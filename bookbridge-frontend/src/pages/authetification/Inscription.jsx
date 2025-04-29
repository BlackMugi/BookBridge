import React, { useState } from "react";
import "../../assets/styles/Auth.css";
import { Link } from "react-router-dom";

function Inscription() {
    const [formData, setFormData] = useState({
      nom: "",
      prenom: "",
      email: "",
      motDePasse: "",
      confirmerMotDePasse: "",
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (formData.motDePasse !== formData.confirmerMotDePasse) {
        alert("Les mots de passe ne correspondent pas !");
        return;
      }
  
      console.log("Formulaire envoyé :", formData);
  
      // ➡️ Tu ajouteras ici ton fetch() API plus tard
    };
  
    return (
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Inscription</h2>
  
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
            name="motDePasse"
            placeholder="Mot de passe"
            value={formData.motDePasse}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmerMotDePasse"
            placeholder="Confirmer mot de passe"
            value={formData.confirmerMotDePasse}
            onChange={handleChange}
            required
          />
  
          <button type="submit" className="submit-btn">S'inscrire</button>
  
          {/* Texte et lien pour se connecter */}
          <p className="auth-link">
            Vous avez déjà un compte ?{" "}
            <Link to="/authetification/connexion">Connectez-vous ici</Link>
          </p>
  
        </form>
      </div>
    );
  }
  
  export default Inscription;