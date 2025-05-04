package sn.edu.bookbridge.restfull.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.edu.bookbridge.restfull.model.Reservation;
import sn.edu.bookbridge.restfull.model.Exemplaire;
import sn.edu.bookbridge.restfull.model.Utilisateur;
import sn.edu.bookbridge.restfull.repository.ReservationRepository;
import sn.edu.bookbridge.restfull.repository.ExemplaireRepository;
import sn.edu.bookbridge.restfull.repository.UtilisateurRepository;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ExemplaireRepository exemplaireRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @PostMapping
    public Reservation reserver(
        @RequestParam Long exemplaireId,
        @RequestParam Long utilisateurId,
        @RequestParam int jours
    ) {
        Exemplaire exemplaire = exemplaireRepository.findById(exemplaireId)
            .orElseThrow(() -> new RuntimeException("Exemplaire introuvable"));

        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId)
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        Reservation reservation = new Reservation();
        reservation.setExemplaire(exemplaire);
        reservation.setUtilisateur(utilisateur);
        reservation.setDateDebut(LocalDate.now());
        reservation.setDateFin(LocalDate.now().plusDays(jours));

        return reservationRepository.save(reservation);
    }
}
