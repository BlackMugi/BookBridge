import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarAdmin from "../../components/admin/sidebar/SidebarAdmin";
import '../../assets/styles/GererLivres.css';

function ModifierExemplaire() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exemplaire, setExemplaire] = useState({
    codeBarre: "",
    disponibilite: true,
    isbn: ""
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/exemplaires/${id}`)
      .then(res => res.json())
      .then(data => {
        setExemplaire(data);
      })
      .catch(err => console.error("Erreur chargement exemplaire :", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "disponibilite") {
      setExemplaire((prev) => ({ ...prev, disponibilite: value === "true" }));
    } else {
      setExemplaire((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/exemplaires/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exemplaire),
      });

      if (response.ok) {
        alert("Exemplaire modifié avec succès.");
        navigate("/admin/gerer-un-exemplaire");
      } else {
        alert("Erreur lors de la modification.");
      }
    } catch (err) {
      console.error("Erreur :", err);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="ajouter-livre">
      <SidebarAdmin />
      <div className="modifier-livre">
        <h2>Modifier l'Exemplaire</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="codeBarre"
            value={exemplaire.codeBarre}
            onChange={handleChange}
            placeholder="Code-barres"
            required
          />

          <select
            name="disponibilite"
            value={exemplaire.disponibilite.toString()}
            onChange={handleChange}
            required
          >
            <option value="true">Disponible</option>
            <option value="false">Indisponible</option>
          </select>

          <input
            type="text"
            name="isbn"
            value={exemplaire.isbn}
            onChange={handleChange}
            placeholder="isbn"
            required
          />

          <div className="update-cancel">
            <button type="submit">Enregistrer les modifications</button>
            <button type="button" onClick={() => navigate("/admin/gerer-un-exemplaire")}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModifierExemplaire;
