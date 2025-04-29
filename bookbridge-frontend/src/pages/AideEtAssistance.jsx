import React from "react";
import "../assets/styles/AideEtAssistance.css"; // On va aussi créer ce fichier CSS

function AideEtAssistance() {
  return (
    <div className="aide-container">
      <h1>Aide et Assistance 🛠️</h1>
      
      <section className="faq">
        <h2>Foire aux Questions (FAQ)</h2>
        <div className="faq-item">
          <h3>Comment réserver un livre ?</h3>
          <p>Pour réserver un livre, il vous suffit de naviguer dans la bibliothèque, de cliquer sur le livre qui vous intéresse, puis d'appuyer sur le bouton "Réserver".</p>
        </div>
        <div className="faq-item">
          <h3>Qu'est-ce que l'option "Voir" ?</h3>
          <p>Lorsque vous cliquez sur "Voir" à côté d'un livre, vous pouvez consulter tous les détails du livre avant de procéder à la réservation.</p>
        </div>
        <div className="faq-item">
          <h3>Puis-je annuler une réservation ?</h3>
          <p>Non, une fois la réservation confirmée, il n'est pas possible de l'annuler pour l'instant. Veuillez vous assurer de vos choix avant de réserver.</p>
        </div>
      </section>

      <section className="contact">
        <h2>Contactez-nous</h2>
        <p>Si vous avez des questions supplémentaires, n'hésitez pas à nous contacter :</p>
        <ul>
          <li>Email : <a href="mailto:contact@bookbridge.com">contact@bookbridge.com</a></li>
          <li>Téléphone : +221 33 123 45 67</li>
          <li>Adresse : 123 Rue de la Bibliothèque, Dakar, Senegal</li>
        </ul>
      </section>
    </div>
  );
}

export default AideEtAssistance;