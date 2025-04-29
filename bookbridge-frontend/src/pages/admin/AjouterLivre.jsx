import React, { useState } from "react";
import '../../assets/styles/AjouterLivre.css'
import SidebarAdmin from "../../components/admin/sidebar/SidebarAdmin";

function AjouterLivre() {
  const [formData, setFormData] = useState({
    titre: "",
    auteur: "",
    isbn: "",
    categorie: "",
    anneePublication: "",
    maisonEdition: "",
    image_couverture: null, // Nouveau champ pour l'image de couverture
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
      image_couverture: e.target.files[0], // Enregistrement du fichier image
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    // Ajouter toutes les données du formulaire
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // Vous pouvez maintenant envoyer formDataToSend à votre API
    console.log(formDataToSend);
  };

  return (
    <div className="ajouter-livre">
      <SidebarAdmin />
      <h2>Ajouter un Livre</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre :</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Auteur :</label>
          <input
            type="text"
            name="auteur"
            value={formData.auteur}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>ISBN :</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Catégorie :</label>
          <input
            type="text"
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Année de Publication :</label>
          <input
            type="number"
            name="anneePublication"
            value={formData.anneePublication}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Maison d'Édition :</label>
          <input
            type="text"
            name="maisonEdition"
            value={formData.maisonEdition}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image de couverture :</label>
          <input
            type="file"
            name="image_couverture"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Ajouter Livre</button>
      </form>
    </div>
  );
}

export default AjouterLivre;