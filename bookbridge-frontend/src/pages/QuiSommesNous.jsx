import React from "react";
import "../assets/styles/QuiSommesNous.css";
import missionImage from "../assets/images/mission.jpg";
import visionImage from "../assets/images/vision.jpg";
import equipeImage from "../assets/images/equipe.jpg";
import fondateurImage from "../assets/images/fondateur.jpg";
import marketingImage from "../assets/images/marketing.jpg";
import developpeurImage from "../assets/images/developpeur.jpg";
import biblioImage from "../assets/images/biblio.jpg";


function QuiSommesNous() {
  return (
    <div className="qui-sommes-nous">
      <h1>Qui sommes-nous ?</h1>
      
      <div className="section-box">
        <section className="intro">
            <img src={missionImage} alt="mission_Image" />
            <div className="contain-box">
                <h2>Notre Mission</h2>
                <p>
                BookBridge est une plateforme dédiée à la mise à disposition de livres à la fois physiques et numériques.
                Nous avons pour mission de permettre à chacun, où qu'il soit, d'avoir accès à une large sélection de livres,
                de la littérature classique aux ouvrages les plus récents. Notre objectif est de promouvoir l'accès à la culture
                et à la connaissance à travers une bibliothèque en ligne moderne, pratique et ouverte à tous.
                </p>
            </div>
        </section>
      </div>

      <div className="section-box">
        <section className="intro">
            <div className="contain-box">
                <h2>Notre Vision</h2>
                <p>
                Nous croyons que chaque personne mérite de pouvoir découvrir, apprendre et s'évader grâce à la lecture.
                C'est pourquoi BookBridge s'efforce de créer une plateforme accessible, où la réservation de livres est simple,
                rapide et intuitive. Nous avons l'ambition de devenir le leader mondial des bibliothèques numériques, tout en
                préservant l'aspect humain de la lecture.
                </p>
            </div>
            <img src={visionImage} alt="vision_Image" />
        </section>
      </div>

     <div className="section-box">
        <section className="intro">
        <img src={equipeImage} alt="Equipe_Image" />
            <div className="contain-box">
                <h2>Notre Équipe</h2>
                <p>
                BookBridge est dirigé par une équipe passionnée par les livres et l'innovation technologique. Nos membres viennent
                de divers horizons et partagent une même vision : rendre la lecture accessible à tous, partout.
                </p>
            </div>
        </section>
     </div>
     <div className="membre">
        <ul>
          <li>
            <img src={fondateurImage} alt="CEO_Image" />
            <strong>Souleymane Soumare</strong>
             - CEO & Fondateur
          </li>
          <li>
            <img src={marketingImage} alt="Marketing_Image" />
            <strong>Aby Gueye</strong>
             - Responsable Marketing
          </li>
          <li>
          <img src={developpeurImage} alt="developpeur_Image" />
            <strong>Mamadou Sakho</strong>
             - Développeur Senior
            </li>
          <li>
            <img src={biblioImage} alt="Bibliothèque_Image" />
            <strong>Fatima Sow</strong>
             - Responsable Bibliothèque
          </li>
        </ul>
     </div>
    </div>
  );
}

export default QuiSommesNous;