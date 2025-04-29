import { React } from "react";
import {  FaSearch } from "react-icons/fa";
import "./Navbar.css";
import Logo from '../../assets/images/LogoBookBridge.png'

function Navbar() {

	return (
		<header>
            <a href="/"><img className="Logo" src={Logo} alt="" /></a>
            <div className="search-box">
                <input type="text" className="search-input" placeholder="Chercher" />
                <button className="search-btn">
                    <FaSearch />
                </button>
            </div>
			<nav>
				<a href="/">Accueil</a>
				<a href="/bibliotheque">Bibliothèque</a>
				<a href="/suivi-du-statut">Suivis du Statut</a>
				<a href="/aide-et-assistance">Aide et Assistance</a>
			</nav>
		</header>
	);
}

export default Navbar;