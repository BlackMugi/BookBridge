package sn.edu.bookbridge.restfull.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import sn.edu.bookbridge.restfull.model.Utilisateur;
import sn.edu.bookbridge.restfull.repository.UtilisateurRepository;

import java.util.Optional;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "*")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<?> inscrireUtilisateur(@RequestBody Utilisateur utilisateur) {
        Optional<Utilisateur> existingUser = utilisateurRepository.findByEmail(utilisateur.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body("Un compte avec cet email existe déjà.");
        }

        utilisateur.setMot_de_passe(passwordEncoder.encode(utilisateur.getMot_de_passe()));
        Utilisateur savedUser = utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/connexion")
    public ResponseEntity<?> connecterUtilisateur(@RequestBody Utilisateur loginRequest) {
        Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findByEmail(loginRequest.getEmail());

        if (utilisateurOpt.isPresent()) {
            Utilisateur utilisateur = utilisateurOpt.get();

            if (passwordEncoder.matches(loginRequest.getMot_de_passe(), utilisateur.getMot_de_passe())) {
                utilisateur.setMot_de_passe(null);
                return ResponseEntity.ok().body(Map.of("utilisateur", utilisateur));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe invalide.");
    }


    @GetMapping
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @PutMapping("/{id}/changer-role")
    public ResponseEntity<?> changerRole(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Optional<Utilisateur> optionalUtilisateur = utilisateurRepository.findById(id);
        if (optionalUtilisateur.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé.");
        }
    
        Utilisateur utilisateur = optionalUtilisateur.get();
    
        // Empêche la modification du super admin
        if ("bookbridge@admin.com".equalsIgnoreCase(utilisateur.getEmail())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Impossible de modifier ce compte.");
        }
    
        String nouveauRole = body.get("role");
        if (nouveauRole == null || (!nouveauRole.equals("user") && !nouveauRole.equals("bibliothecaire"))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Rôle invalide.");
        }
    
        utilisateur.setRole(nouveauRole);
        utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok(utilisateur);
    }
    
}
