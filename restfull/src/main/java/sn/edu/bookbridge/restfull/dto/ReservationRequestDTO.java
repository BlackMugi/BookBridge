package sn.edu.bookbridge.restfull.dto;

public class ReservationRequestDTO {
    private Long utilisateurId;
    private Long livreId;
    private int jours;

    // Getters & Setters
    public Long getUtilisateurId() {
        return utilisateurId;
    }

    public void setUtilisateurId(Long utilisateurId) {
        this.utilisateurId = utilisateurId;
    }

    public Long getLivreId() {
        return livreId;
    }

    public void setLivreId(Long livreId) {
        this.livreId = livreId;
    }

    public int getJours() {
        return jours;
    }

    public void setJours(int jours) {
        this.jours = jours;
    }
}
