package sn.edu.bookbridge.restfull.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.edu.bookbridge.restfull.dto.ExemplaireDto;
import sn.edu.bookbridge.restfull.model.Exemplaire;
import sn.edu.bookbridge.restfull.model.Livre;
import sn.edu.bookbridge.restfull.repository.ExemplaireRepository;
import sn.edu.bookbridge.restfull.repository.LivreRepository;

import java.util.HashMap;
import java.util.Optional;
import java.util.stream.Collectors;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exemplaires")
@CrossOrigin(origins = "*")
public class ExemplaireController {

    @Autowired
    private ExemplaireRepository exemplaireRepository;

    @Autowired
    private LivreRepository livreRepository;

    @PostMapping
    public ResponseEntity<?> ajouterExemplaire(@RequestBody ExemplaireDto request) {
        Optional<Livre> livreOpt = livreRepository.findByIsbn(request.getIsbn());
        if (livreOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Livre avec ISBN " + request.getIsbn() + " non trouvé.");
        }

        Livre livre = livreOpt.get();
        Exemplaire exemplaire = new Exemplaire();
        exemplaire.setCodeBarre(request.getCodeBarre());
        exemplaire.setEtat(request.getEtat());
        exemplaire.setDisponibilite(request.isDisponibilite());
        exemplaire.setLivre(livre);

        Exemplaire saved = exemplaireRepository.save(exemplaire);
        return ResponseEntity.ok(saved);
    }


    @GetMapping
    public ResponseEntity<?> getAllExemplaires() {
        List<Exemplaire> exemplaires = exemplaireRepository.findAll();
        List<Map<String, Object>> response = exemplaires.stream().map(ex -> {
        Map<String, Object> map = new HashMap<>();
        map.put("id", ex.getId());
        map.put("codeBarre", ex.getCodeBarre());
        map.put("etat", ex.getEtat());
        map.put("disponibilite", ex.isDisponibilite() ? "Disponible" : "Indisponible");
        map.put("titreLivre", ex.getLivre().getTitre());
        return map;
    }).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getExemplaireById(@PathVariable Long id) {
        Optional<Exemplaire> exemplaireOpt = exemplaireRepository.findById(id);
        if (exemplaireOpt.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Exemplaire introuvable.");
        }

        Exemplaire ex = exemplaireOpt.get();
         Map<String, Object> response = new HashMap<>();
        response.put("id", ex.getId());
        response.put("codeBarre", ex.getCodeBarre());
        response.put("etat", ex.getEtat());
        response.put("disponibilite", ex.isDisponibilite());
        response.put("isbn", ex.getLivre().getIsbn());

        return ResponseEntity.ok(response);
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> supprimerExemplaire(@PathVariable Long id) {
        Optional<Exemplaire> exemplaireOpt = exemplaireRepository.findById(id);
        if (exemplaireOpt.isPresent()) {
            exemplaireRepository.deleteById(id);
            return ResponseEntity.ok("Exemplaire supprimé avec succès.");
        } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Exemplaire introuvable.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modifierExemplaire(@PathVariable Long id, @RequestBody Exemplaire exemplaireModifie) {
        Optional<Exemplaire> exemplaireOpt = exemplaireRepository.findById(id);

        if (!exemplaireOpt.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Exemplaire introuvable.");
        }

        Exemplaire existant = exemplaireOpt.get();
        existant.setCodeBarre(exemplaireModifie.getCodeBarre());
        existant.setEtat(exemplaireModifie.getEtat());
        existant.setDisponibilite(exemplaireModifie.isDisponibilite());

        exemplaireRepository.save(existant);
        return ResponseEntity.ok("Exemplaire modifié avec succès.");
    }
}
