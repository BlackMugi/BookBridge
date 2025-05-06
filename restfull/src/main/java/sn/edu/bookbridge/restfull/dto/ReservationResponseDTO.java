package sn.edu.bookbridge.restfull.dto;

import java.time.LocalDate;

public class ReservationResponseDTO {
    private Long id;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String livre;
    private String statut;
    private String codeBarre;
    private String etatExemplaire;
    private String emailUtilisateur;

    

    public ReservationResponseDTO(Long id, LocalDate dateDebut, LocalDate dateFin, 
                                  String livre, String statut, String codeBarre, 
                                  String etatExemplaire, String emailUtilisateur) {
        this.id = id;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.livre = livre;
        this.statut = statut;
        this.codeBarre = codeBarre;
        this.etatExemplaire = etatExemplaire;
        this.emailUtilisateur = emailUtilisateur;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public String getLivre() {
        return livre;
    }

    public String getStatut() {
        return statut;
    }

    public String getCodeBarre() {
        return codeBarre;
    }

    public String getEtatExemplaire() {
        return etatExemplaire;
    }
    
    public String getEmailUtilisateur() {
        return emailUtilisateur;
    }
}
