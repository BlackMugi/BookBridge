import React from "react";
import "../assets/styles/MentionsLegales.css";

function MentionsLegales() {
  return (
    <div className="mentions-legales">
      <h1>Mentions Légales</h1>

      <section>
        <h2>Éditeur du Site</h2>
        <p>
          Le site BookBridge est édité par :
          <br />
          <strong>BookBridge</strong> - Plateforme de gestion de bibliothèque en ligne.
          <br />
          Adresse : 123 Rue des Livres, Dakar, Sénégal
          <br />
          Email : contact@bookbridge.com
        </p>
      </section>

      <section>
        <h2>Directeur de Publication</h2>
        <p>
          Souleymane Soumare, en qualité de fondateur et CEO de BookBridge.
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par :
          <br />
          <strong>OVH Cloud</strong>
          <br />
          2 rue Kellermann, 59100 Roubaix, France
          <br />
          Téléphone : +33 9 72 10 10 07
        </p>
      </section>

      <section>
        <h2>Propriété Intellectuelle</h2>
        <p>
          Tous les contenus présents sur BookBridge (textes, images, logo, design) sont protégés par le droit d'auteur. Toute reproduction, totale ou partielle, est strictement interdite sans autorisation préalable.
        </p>
      </section>

      <section>
        <h2>Responsabilité</h2>
        <p>
          BookBridge s'efforce d'assurer au mieux l'exactitude des informations diffusées. Toutefois, l'éditeur ne saurait être tenu pour responsable d'éventuelles erreurs ou omissions.
        </p>
      </section>

    </div>
  );
}

export default MentionsLegales;