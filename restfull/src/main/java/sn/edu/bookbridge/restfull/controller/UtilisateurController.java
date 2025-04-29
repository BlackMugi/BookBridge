package sn.edu.bookbridge.restfull.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sn.edu.bookbridge.restfull.entity.Utilisateur;
import sn.edu.bookbridge.restfull.repository.UtilisateurRepository;

import java.util.Optional;
import java.util.Map;

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
}
