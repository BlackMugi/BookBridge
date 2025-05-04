package sn.edu.bookbridge.restfull.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.edu.bookbridge.restfull.model.Exemplaire;

public interface ExemplaireRepository extends JpaRepository<Exemplaire, Long> {
}
