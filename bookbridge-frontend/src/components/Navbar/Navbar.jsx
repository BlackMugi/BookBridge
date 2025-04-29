import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";
import Logo from '../../assets/images/LogoBookBridge.png';

function Navbar() {
  const navigate = useNavigate();

  // Vérifie si un token est présent dans le localStorage
  const isLoggedIn = localStorage.getItem("token") !== null;

  const handleLogout = () => {
    // On vide le localStorage pour déconnecter l'utilisateur
    localStorage.removeItem("token");
    localStorage.removeItem("utilisateur");
    localStorage.removeItem("role");

    // Redirige vers la page de connexion
    navigate("/connexion");
  };

  return (
    <header>
      <Link className="Link" to="/">
        <img className="Logo" src={Logo} alt="Logo BookBridge" />
      </Link>
      <div className="search-box">
        <input type="text" className="search-input" placeholder="Chercher" />
        <button className="search-btn">
          <FaSearch />
        </button>
      </div>
      <nav>
        <Link className="Link" to="/">Accueil</Link>
        <Link className="Link" to="/bibliotheque">Bibliothèque</Link>
        <Link className="Link" to="/suivi-du-statut">Suivi du Statut</Link>
        <Link className="Link" to="/aide-et-assistance">Aide et Assistance</Link>

        {/* Affiche un bouton de déconnexion si l'utilisateur est connecté */}
        {isLoggedIn ? (
          <button className="Link" onClick={handleLogout}>Déconnexion</button>
        ) : (
          // Sinon, affiche un lien vers la page de connexion
          <Link className="login-button" to="/authetification/connexion">Connexion</Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
