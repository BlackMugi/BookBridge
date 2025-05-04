package sn.edu.bookbridge.restfull.dto;

public class ExemplaireDto {
    private String codeBarre;
    private String etat;
    private boolean disponibilite;
    private String isbn;

    // Getters et Setters
    public String getCodeBarre() { return codeBarre; }
    public void setCodeBarre(String codeBarre) { this.codeBarre = codeBarre; }

    public String getEtat() { return etat; }
    public void setEtat(String etat) { this.etat = etat; }

    public boolean isDisponibilite() { return disponibilite; }
    public void setDisponibilite(boolean disponibilite) { this.disponibilite = disponibilite; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
}
