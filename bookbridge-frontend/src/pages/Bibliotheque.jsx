import React, { useEffect, useState } from "react";
import LivreCard from "../components/LivreCard/LivreCard";
import "../assets/styles/Bibliotheque.css";

function Bibliotheque() {
    const [livres, setLivres] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); // Pour la recherche
    const livresParPage = 16;

    useEffect(() => {
        fetch("http://localhost:8080/api/livres")
            .then((response) => response.json())
            .then((data) => {
                console.log("Données reçues :", data);
                setLivres(data);
            })
            .catch((error) => console.error("Erreur lors du chargement des livres :", error));
    }, []);

    // Filtrage des livres qui sont disponibles
    const livresDisponibles = livres.filter((livre) => livre.disponibilite >= 1);

    // Filtrage des livres en fonction du terme de recherche
    const livresFiltres = livresDisponibles.filter((livre) => {
        return livre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
               livre.auteur.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Pagination
    const indexOfLast = currentPage * livresParPage;
    const indexOfFirst = indexOfLast - livresParPage;
    const livresActuels = livresFiltres.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(livresFiltres.length / livresParPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="bibliotheque-container">
            <h1>Ma Bibliothèque</h1>
            <div className="search-contain">
                <input
                    type="text"
                    className="search-conatain-input"
                    placeholder="Chercher un livre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Mise à jour du terme de recherche
                />
            </div>

            <div className="biblio-contain">
                <div className="livres-grid">
                    {livresActuels.length === 0 ? (
                        <p>Aucun livre trouvé</p> // Affichage du message si aucun livre ne correspond
                    ) : (
                        livresActuels.map((livre) => (
                            <LivreCard key={livre.id} livre={livre} />
                        ))
                    )}
                </div>
            </div>

            <div className="pagination-buttons">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    ← Précédente
                </button>
                <span>Page {currentPage} / {totalPages}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                    Suivante →
                </button>
            </div>
        </div>
    );
}

export default Bibliotheque;
