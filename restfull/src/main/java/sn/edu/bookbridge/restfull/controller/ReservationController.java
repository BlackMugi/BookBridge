package sn.edu.bookbridge.restfull.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.edu.bookbridge.restfull.model.Reservation;
import sn.edu.bookbridge.restfull.model.Exemplaire;
import sn.edu.bookbridge.restfull.model.Livre;
import sn.edu.bookbridge.restfull.model.Utilisateur;
import sn.edu.bookbridge.restfull.repository.LivreRepository;
import sn.edu.bookbridge.restfull.repository.ReservationRepository;
import sn.edu.bookbridge.restfull.repository.ExemplaireRepository;
import sn.edu.bookbridge.restfull.repository.UtilisateurRepository;
import sn.edu.bookbridge.restfull.dto.ReservationResponseDTO;
import sn.edu.bookbridge.restfull.dto.ReservationRequestDTO;


import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ExemplaireRepository exemplaireRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private LivreRepository livreRepository;

    @PostMapping
    public ResponseEntity<ReservationResponseDTO> reserver(@RequestBody ReservationRequestDTO request) {
        Utilisateur utilisateur = utilisateurRepository.findById(request.getUtilisateurId())
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        Livre livre = livreRepository.findById(request.getLivreId())
            .orElseThrow(() -> new RuntimeException("Livre introuvable"));

        // Trouver le premier exemplaire disponible
        Exemplaire exemplaireDisponible = livre.getExemplaires().stream()
            .filter(Exemplaire::isDisponibilite)
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Aucun exemplaire disponible pour ce livre"));

        // Marquer l'exemplaire comme non-disponible
        exemplaireDisponible.setDisponibilite(false);
        exemplaireRepository.save(exemplaireDisponible);

        Reservation reservation = new Reservation();
        reservation.setUtilisateur(utilisateur);
        reservation.setExemplaire(exemplaireDisponible);
        reservation.setDateDebut(LocalDate.now());
        reservation.setDateFin(LocalDate.now().plusDays(request.getJours()));

        reservation = reservationRepository.save(reservation);

        return ResponseEntity.ok(new ReservationResponseDTO(
            reservation.getId(),
            reservation.getDateDebut(),
            reservation.getDateFin(),
            reservation.getExemplaire().getLivre().getTitre(),
            "En cours",
            reservation.getExemplaire().getCodeBarre(),
            reservation.getExemplaire().getEtat(),
            utilisateur.getEmail()
        ));
        
    }

    @GetMapping("/utilisateur/{utilisateurId}")
    public List<ReservationResponseDTO> getReservationsByUtilisateur(@PathVariable Long utilisateurId) {
        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId)
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
    
        List<Reservation> reservations = reservationRepository.findByUtilisateur(utilisateur);
    
        return reservations.stream().map(reservation -> {
            Livre livre = reservation.getExemplaire().getLivre();
            String statut;
            if (LocalDate.now().isBefore(reservation.getDateDebut())) {
                statut = "En attente";
            } else if (LocalDate.now().isAfter(reservation.getDateFin())) {
                statut = "Terminée";
            } else {
                statut = "En cours";
            }
        
            return new ReservationResponseDTO(
                reservation.getId(),
                reservation.getDateDebut(),
                reservation.getDateFin(),
                livre.getTitre(),
                statut,
                reservation.getExemplaire().getCodeBarre(),
                reservation.getExemplaire().getEtat(),
                utilisateur.getEmail()
            );
        }).toList();        
    }
    
    @GetMapping
    public List<ReservationResponseDTO> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();

        return reservations.stream().map(reservation -> {
            Livre livre = reservation.getExemplaire().getLivre();

            Utilisateur utilisateur = reservation.getUtilisateur();

            String statut;
            if (LocalDate.now().isBefore(reservation.getDateDebut())) {
                statut = "En attente";
            } else if (LocalDate.now().isAfter(reservation.getDateFin())) {
                statut = "Terminée";
            } else {
                statut = "En cours";
            }

            return new ReservationResponseDTO(
                reservation.getId(),
                reservation.getDateDebut(),
                reservation.getDateFin(),
                livre.getTitre(),
                statut,
                reservation.getExemplaire().getCodeBarre(),
                reservation.getExemplaire().getEtat(),
                utilisateur.getEmail()
            );
        }).toList();
    }

}
