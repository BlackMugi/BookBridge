import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Bibliotheque.css";

function Bibliotheque() {
  const navigate = useNavigate();

  const livres = [
    {
      id: 1,
      titre: "Le Petit Prince",
      image: "/imageLivre/lepetitprince.jpg",
      auteur: "Antoine de Saint-Exupéry",
      annee: 1943,
      maisonEdition: "Gallimard",
      categorie: "Conte philosophique",
      isbn: "978-2070612758",
    },
    {
      id: 2,
      titre: "1984",
      image: "/imageLivre/1984.jpg",
      auteur: "George Orwell",
      annee: 1949,
      maisonEdition: "Secker and Warburg",
      categorie: "Dystopie",
      isbn: "978-0451524935",
    },
    {
      id: 3,
      titre: "Harry Potter",
      image: "/imageLivre/harrypotter.jpg",
      auteur: "J.K. Rowling",
      annee: 1997,
      maisonEdition: "Bloomsbury",
      categorie: "Fantasy",
      isbn: "978-0747532743",
    },
  ];

  const goToDetail = (livre) => {
    navigate("/detail", { state: { livre } }); // Passe les infos du livre à la page Détail
  };

  return (
    <div className="bibliotheque">
      <h1 className="titre-page">Découvrez Notre Collection 📚</h1>

      <div className="livres-grid">
        {livres.map((livre) => (
          <div key={livre.id} className="livre-card">
            <img src={livre.image} alt={livre.titre} className="livre-image" />
            <h2 className="livre-titre">{livre.titre}</h2>
            <button onClick={() => goToDetail(livre)} className="btn-voir-detail">
              Voir Détail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bibliotheque;