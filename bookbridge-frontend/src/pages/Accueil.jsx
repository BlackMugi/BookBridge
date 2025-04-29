import React from "react";
import "../assets/styles/Accueil.css";
import bookImage from "../assets/images/landing-book-1.png";

function Accueil() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>Bienvenue sur <span>BookBridge 📚</span></h1>
          <p>Votre passerelle vers la connaissance, la découverte et l'aventure littéraire.</p>
          <a href="/bibliotheque" className="btn-start">Explorer la Bibliothèque</a>
        </div>
        <div className="hero-image">
          <img className="landing-book" src={bookImage} alt="Livre accueil" />
        </div>
      </section>

      <section className="features">
        <h2>Pourquoi choisir BookBridge ?</h2>
        <div className="features-list">
          <div className="feature">
            <h3>Réservation Simple</h3>
            <p>En quelques clics, réservez vos livres préférés en ligne.</p>
          </div>
          <div className="feature">
            <h3>Disponible 24/7</h3>
            <p>Accédez à votre bibliothèque n'importe quand, n'importe où.</p>
          </div>
          <div className="feature">
            <h3>Large Choix</h3>
            <p>Un grand catalogue de livres adaptés à tous les goûts.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Accueil;