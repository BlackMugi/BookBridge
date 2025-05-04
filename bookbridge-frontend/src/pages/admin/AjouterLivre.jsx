import React, { useState } from "react";
import '../../assets/styles/AjouterLivre.css';
import SidebarAdmin from "../../components/admin/sidebar/SidebarAdmin";

function AjouterLivre() {
  const [formData, setFormData] = useState({
    titre: "",
    auteur: "",
    isbn: "",
    categorie: "",
    anneePublication: "",
    maisonEdition: "",
    image_couverture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image_couverture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image_couverture) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    const data = new FormData();
    data.append("titre", formData.titre);
    data.append("auteur", formData.auteur);
    data.append("isbn", formData.isbn);
    data.append("categorie", formData.categorie);
    data.append("anneePublication", formData.anneePublication);
    data.append("maisonEdition", formData.maisonEdition);
    data.append("image", formData.image_couverture); // nom attendu par le backend

    try {
      const response = await fetch("http://localhost:8080/api/livres", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      console.log("REST Response:", result);

      if (response.ok) {
        alert("Livre ajouté avec succès !");
      } else {
        alert("Erreur lors de l'ajout du livre.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="ajouter-livre">
      <SidebarAdmin />
      <h2>Ajouter un Livre</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre :</label>
          <input type="text" name="titre" value={formData.titre} onChange={handleChange} required />
        </div>
        <div>
          <label>Auteur :</label>
          <input type="text" name="auteur" value={formData.auteur} onChange={handleChange} required />
        </div>
        <div>
          <label>ISBN :</label>
          <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} required />
        </div>
        <div>
          <label>Catégorie :</label>
          <input type="text" name="categorie" value={formData.categorie} onChange={handleChange} required />
        </div>
        <div>
          <label>Année de Publication :</label>
          <input type="number" name="anneePublication" value={formData.anneePublication} onChange={handleChange} required />
        </div>
        <div>
          <label>Maison d'Édition :</label>
          <input type="text" name="maisonEdition" value={formData.maisonEdition} onChange={handleChange} required />
        </div>
        <div>
          <label>Image de couverture :</label>
          <input type="file" name="image_couverture" onChange={handleFileChange} required />
        </div>
        <button type="submit">Ajouter Livre</button>
      </form>
    </div>
  );
}

export default AjouterLivre;
