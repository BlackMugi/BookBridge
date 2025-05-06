package sn.edu.bookbridge.restfull.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.edu.bookbridge.restfull.model.Reservation;
import sn.edu.bookbridge.restfull.model.Utilisateur;

import java.util.List;


public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    // Trouver toutes les réservations pour un utilisateur spécifique
    List<Reservation> findByUtilisateurId(Long utilisateurId);
    List<Reservation> findByUtilisateur(Utilisateur utilisateur);
   
}
