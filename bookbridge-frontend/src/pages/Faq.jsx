import React, { useState } from "react";
import "../assets/styles/Faq.css";

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    {
      question: "Comment réserver un livre sur BookBridge ?",
      answer:
        "Il vous suffit de parcourir notre bibliothèque, de cliquer sur le livre souhaité, puis de cliquer sur le bouton 'Réserver'. Vous pourrez suivre l'état de votre réservation dans votre espace personnel."
    },
    {
      question: "Puis-je emprunter plusieurs livres en même temps ?",
      answer:
        "Oui, vous pouvez réserver plusieurs livres en fonction de leur disponibilité. Toutefois, un nombre maximum de livres simultanés peut être fixé selon votre abonnement."
    },
    {
      question: "Comment annuler une réservation ?",
      answer:
        "Vous pouvez annuler une réservation en allant dans votre espace 'Suivi du Statut' et en sélectionnant la réservation que vous souhaitez annuler."
    },
    {
      question: "Que faire si un livre est indisponible ?",
      answer:
        "Si un livre est temporairement indisponible, vous pouvez le mettre en liste d'attente. Vous serez notifié dès qu'il sera à nouveau disponible."
    },
    {
      question: "Est-ce que BookBridge propose des livres numériques ?",
      answer:
        "Oui ! Nous proposons à la fois des livres physiques et numériques pour répondre à toutes vos préférences de lecture."
    },
  ];

  return (
    <div className="faq-conatiner">
        <div className="faq">
        <h1>Foire Aux Questions (FAQ)</h1>
        <div className="faq-list">
            {questions.map((item, index) => (
            <div
                className={`faq-item ${activeIndex === index ? "active" : ""}`}
                key={index}
            >
                <div
                className="faq-question"
                onClick={() => toggleQuestion(index)}
                >
                {item.question}
                </div>
                {activeIndex === index && (
                <div className="faq-answer">
                    {item.answer}
                </div>
                )}
            </div>
            ))}
        </div>
        </div>
    </div>
  );
}

export default Faq;