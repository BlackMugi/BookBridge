import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarAdmin from "../../components/admin/sidebar/SidebarAdmin";
import '../../assets/styles/GererLivres.css';

function ModifierLivre() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livre, setLivre] = useState({
    titre: "",
    auteur: "",
    isbn: "",
    categorie: "",
    anneePublication: "",
    maisonEdition: "",
    imageCouverture: ""
  });
  const [imagePreview, setImagePreview] = useState(null);

//On recuperes les données de l'utilisateur
  useEffect(() => {
    fetch(`http://localhost:8080/api/livres/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const livreData = {
          titre: data.titre || "",
          auteur: data.auteur || "",
          isbn: data.isbn || "",
          categorie: data.categorie || "",
          anneePublication: data.anneePublication || "",
          maisonEdition: data.maisonEdition || "",
          imageCouverture: data.imageCouverture || ""
        };
        setLivre(livreData);
        setImagePreview(`http://localhost:8080/api/livres/images/${data.imageCouverture}`);
      })
      .catch((err) => console.error("Erreur lors du chargement du livre:", err));
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivre((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLivre((prev) => ({ ...prev, imageCouverture: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(livre).forEach(([key, value]) => {
        if (key === "imageCouverture") {
          formData.append("image", value); 
        } else {
          formData.append(key, value);
        }
    });

    try {
      const response = await fetch(`http://localhost:8080/api/livres/${id}`, {
        method: "PUT",
        body: formData
      });

      if (response.ok) {
        alert("Livre modifié avec succès");
        navigate("/admin/gerer-un-livre");
      } else {
        alert("Erreur lors de la modification");
      }
    } catch (err) {
      console.error("Erreur:", err);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="ajouter-livre">
      <SidebarAdmin />
      <div className="modifier-livre">
        <h2>Modifier le Livre</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="titre" value={livre.titre} onChange={handleChange} placeholder="Titre" required />
          <input type="text" name="auteur" value={livre.auteur} onChange={handleChange} placeholder="Auteur" required />
          <input type="text" name="isbn" value={livre.isbn} onChange={handleChange} placeholder="ISBN" required />
          <input type="text" name="categorie" value={livre.categorie} onChange={handleChange} placeholder="Catégorie" required />
          <input type="number" name="anneePublication" value={livre.anneePublication} onChange={handleChange} placeholder="Année" required />
          <input type="text" name="maisonEdition" value={livre.maisonEdition} onChange={handleChange} placeholder="Maison d'Édition" required />

          <label>Image de Couverture :</label>
          {imagePreview && <img src={imagePreview} alt="aperçu" height="100" />}
          <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
          <div className="update-cancel">
            <button type="submit">Enregistrer les modifications</button>
            <button>Annuler</button>
          </div>  
        </form>
      </div>
    </div>
  );
}

export default ModifierLivre;
