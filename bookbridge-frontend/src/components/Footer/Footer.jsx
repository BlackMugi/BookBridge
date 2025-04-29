import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 BookBridge. Tous droits réservés.</p>
        <div className="footer-links">
          <a href="/qui-somme-nous">Qui sommes-nous ?</a>
          <a href="/politique-de-confidentialite">Politique de confidentialité</a>
          <a href="/mention-legale">Mentions légales</a>
          <a href="/foire-aux-questions">FAQ</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;