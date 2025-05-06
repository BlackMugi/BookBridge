package sn.edu.bookbridge.restfull.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.edu.bookbridge.restfull.model.Exemplaire;
import sn.edu.bookbridge.restfull.model.Livre;
import java.util.Optional;

public interface ExemplaireRepository extends JpaRepository<Exemplaire, Long> {
    Optional<Exemplaire> findFirstByLivreAndDisponibiliteTrue(Livre livre);

}

