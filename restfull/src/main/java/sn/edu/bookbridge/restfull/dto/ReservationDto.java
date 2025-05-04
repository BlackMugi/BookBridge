package sn.edu.bookbridge.restfull.dto;

import java.time.LocalDate;

public class ReservationDto {
    private Long id;
    private Long utilisateurId;
    private Long exemplaireId;
    private LocalDate dateDebut;
    private LocalDate dateFin;

    public ReservationDto() {
    }

    public ReservationDto(Long id, Long utilisateurId, Long exemplaireId, LocalDate dateDebut, LocalDate dateFin) {
        this.id = id;
        this.utilisateurId = utilisateurId;
        this.exemplaireId = exemplaireId;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUtilisateurId() {
        return utilisateurId;
    }

    public void setUtilisateurId(Long utilisateurId) {
        this.utilisateurId = utilisateurId;
    }

    public Long getExemplaireId() {
        return exemplaireId;
    }

    public void setExemplaireId(Long exemplaireId) {
        this.exemplaireId = exemplaireId;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }
}
