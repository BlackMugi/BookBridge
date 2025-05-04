import React, { useState } from "react";
import '../../assets/styles/AjouterLivre.css';
import SidebarAdmin from "../../components/admin/sidebar/SidebarAdmin";

function AjouterExemplaire() {
  const [formData, setFormData] = useState({
    codeBarre: "",
    etat: "",
    disponibilite: true,
    isbn: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/exemplaires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Exemplaire ajouté avec succès !");
      } else {
        alert("Erreur code Barre existant");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="ajouter-livre">
      <SidebarAdmin />
      <h2>Ajouter un Exemplaire</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Code Barre :</label>
          <input type="text" name="codeBarre" value={formData.codeBarre} onChange={handleChange} required />
        </div>
        <div>
          <label>État :</label>
          <input type="text" name="etat" value={formData.etat} onChange={handleChange} required />
        </div>
        
        <div>
        <label>Disponibilité :</label>
        <select name="disponibilite" value={formData.disponibilite} onChange={(e) => 
            setFormData((prev) => ({
            ...prev,
            disponibilite: e.target.value === "true"
            }))
        }>
            <option value="true">Disponible</option>
            <option value="false">Indisponible</option>
        </select>
        </div>
    
        <div>
          <label>ISBN du Livre :</label>
          <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} required />
        </div>
        <button type="submit">Ajouter Exemplaire</button>
      </form>
    </div>
  );
}

export default AjouterExemplaire;
