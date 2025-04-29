import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/Auth.css";

function Connexion() {
  const [formData, setFormData] = useState({
    email: "",
    mot_de_passe: "", // changement ici
  });
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");

    try {
      const response = await fetch("http://localhost:8080/api/utilisateurs/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          mot_de_passe: formData.mot_de_passe,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("utilisateur", JSON.stringify(data.utilisateur));
      localStorage.setItem("role", data.utilisateur.role);

      if (data.utilisateur.role === "bibliothecaire") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setErreur(error.message || "Une erreur est survenue");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Connexion</h2>

        {erreur && <p className="error-message">{erreur}</p>}

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

        <button type="submit" className="submit-btn">Se connecter</button>

        <p className="auth-link">
          Vous n'avez pas de compte ?{" "}
          <Link to="/authetification/inscription">Inscrivez-vous ici</Link>
        </p>
      </form>
    </div>
  );
}

export default Connexion;
