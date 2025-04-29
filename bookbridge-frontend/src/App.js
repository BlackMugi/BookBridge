import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Accueil from "./pages/Accueil"; 
import Bibliotheque from "./pages/Bibliotheque";
import Detail from "./pages/Detail";
import SuiviStatut from "./pages/SuiviStatut";
import AideEtAssistance from "./pages/AideEtAssistance";
import QuiSommesNous from "./pages/QuiSommesNous";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import MentionsLegales from "./pages/MentionsLegales";
import Faq from "./pages/Faq";
import Dashboard from "./pages/admin/Dashboard";
import AjouterLivre from "./pages/admin/AjouterLivre";
import GererLivres from "./pages/admin/GererLivres";
import GererExemplaires from "./pages/admin/GererExemplaires";
import GererRoles from "./pages/admin/GererRoles";
import Inscription from "./pages/authetification/Inscription";
import Connexion from "./pages/authetification/Connexion";

import "./App.css";

function App() {
  const location = useLocation(); // 👈 On récupère l'URL actuelle

  // 👇 On vérifie si on est dans l'admin
  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/authetification");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      
      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/authetification/inscription" element={<Inscription />} />
          <Route path="/authetification/connexion" element={<Connexion />} />
          <Route path="/bibliotheque" element={<Bibliotheque />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/suivi-du-statut" element={<SuiviStatut />} />
          <Route path="/aide-et-assistance" element={<AideEtAssistance />} />
          <Route path="/qui-somme-nous" element={<QuiSommesNous />} />
          <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/mention-legale" element={<MentionsLegales />} />
          <Route path="/foire-aux-questions" element={<Faq />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/ajouter-un-livre" element={<AjouterLivre />} />
          <Route path="/admin/gerer-un-livre" element={<GererLivres />} />
          <Route path="/admin/gerer-un-exemplaire" element={<GererExemplaires />} />
          <Route path="/admin/gerer-role" element={<GererRoles />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </>
  );
}

// Très important : Router doit englober App
export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}