package sn.edu.bookbridge.restfull.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.edu.bookbridge.restfull.entity.Utilisateur;

import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByEmail(String email);
}
