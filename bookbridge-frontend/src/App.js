//Nos routes Basiques
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

//Nos Routes pour les Bibliothécaires
import Dashboard from "./pages/admin/Dashboard";
import AjouterLivre from "./pages/admin/AjouterLivre";
import GererLivres from "./pages/admin/GererLivres";
import GererExemplaires from "./pages/admin/GererExemplaires";
import AjouterExemplaire from "./pages/admin/AjouterExemplaire";
import GererRoles from "./pages/admin/GererRoles";
import ModifierLivre from "./pages/admin/ModifierLivre";
import ModifierExemplaire from "./pages/admin/ModifierExemplaire";
import GestionReservation from "./pages/admin/GestionReservation";

//Nos Routes Pour l'Authentification
import Inscription from "./pages/authentification/Inscription";
import Connexion from "./pages/authentification/Connexion";

//Importation pour securiser nos routes
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";


import "./App.css";

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/authentification");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      
      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/authentification/inscription" element={<Inscription />} />
          <Route path="/authentification/connexion" element={<Connexion />} />
          <Route path="/bibliotheque" element={<Bibliotheque />} />
          <Route path="/aide-et-assistance" element={<AideEtAssistance />} />
          <Route path="/qui-somme-nous" element={<QuiSommesNous />} />
          <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/mention-legale" element={<MentionsLegales />} />
          <Route path="/foire-aux-questions" element={<Faq />} />

          {/*On va protéger notre route pour que seule les utilisateurs connectés y ont acces */}
          <Route
            path="/suivi-du-statut"
            element={
              <PrivateRoute>
                <SuiviStatut />
              </PrivateRoute>
            }
          />
          <Route
            path="/detail"
            element={
              <PrivateRoute>
                <Detail />
              </PrivateRoute>
            }
          />

          {/*On va protéger notre route pour que seule les bibliothécaire y ont acces */}
          <Route path="/admin/dashboard" element={
            <AdminRoute><Dashboard /></AdminRoute>
          } />
          <Route path="/admin/ajouter-un-livre" element={
            <AdminRoute><AjouterLivre /></AdminRoute>
          } />
          <Route path="/admin/gerer-un-livre" element={
            <AdminRoute><GererLivres /></AdminRoute>
          } />
          <Route path="/admin/modifier-un-livre/:id" element={
            <AdminRoute><ModifierLivre /></AdminRoute>
          } />
            <Route path="/admin/modifier-un-exemplaire/:id" element={
            <AdminRoute><ModifierExemplaire /></AdminRoute>
          } />
          <Route path="/admin/gerer-un-exemplaire" element={
            <AdminRoute><GererExemplaires /></AdminRoute>
          } />
             <Route path="/admin/ajouter-un-exemplaire" element={
            <AdminRoute><AjouterExemplaire /></AdminRoute>
          } />
          <Route path="/admin/gerer-role" element={
            <AdminRoute><GererRoles /></AdminRoute>
          } />
          <Route path="/admin/gestion-reservation" element={
            <AdminRoute><GestionReservation /></AdminRoute>
          } />
          

        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}