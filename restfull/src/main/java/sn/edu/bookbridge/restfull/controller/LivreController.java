package sn.edu.bookbridge.restfull.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;

import sn.edu.bookbridge.restfull.model.Exemplaire;
import sn.edu.bookbridge.restfull.model.Livre;
import sn.edu.bookbridge.restfull.repository.LivreRepository;

import java.io.File;
import java.io.IOException;

import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

import java.net.MalformedURLException;

@RestController
@RequestMapping("/api/livres")
@CrossOrigin(origins = "*")
public class LivreController {

    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private LivreRepository livreRepository;

    @PostMapping
    public ResponseEntity<?> ajouterLivre(
            @RequestParam String titre,
            @RequestParam String auteur,
            @RequestParam String isbn,
            @RequestParam String categorie,
            @RequestParam int anneePublication,
            @RequestParam String maisonEdition,
            @RequestParam("image") MultipartFile imageFile
    ) {
        try {

            // Vérifier si un livre avec le même ISBN existe déjà
            if (livreRepository.findByIsbn(isbn).isPresent()) {
                return ResponseEntity.badRequest().body("Un livre avec cet ISBN existe déjà.");
            }

            // Vérification doublon Titre + Auteur
            if (livreRepository.findByTitreAndAuteur(titre, auteur).isPresent()) {
                return ResponseEntity.badRequest().body("Un livre avec ce titre et cet auteur existe déjà.");
            }
            
            // Créer le dossier s’il n’existe pas
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) uploadDir.mkdirs();

            // Générer un nom unique pour l’image
            String filename = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
            Path imagePath = Paths.get(UPLOAD_DIR, filename);
            Files.copy(imageFile.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);


            // Créer et sauvegarder le livre
            Livre livre = new Livre();
            livre.setTitre(titre);
            livre.setAuteur(auteur);
            livre.setIsbn(isbn);
            livre.setCategorie(categorie);
            livre.setAnneePublication(anneePublication);
            livre.setMaisonEdition(maisonEdition);
            livre.setImageCouverture(filename); // on enregistre seulement le nom del'image

            livreRepository.save(livre);

            return ResponseEntity.ok().body(livre);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erreur lors de l'enregistrement de l'image.");
        }
    }

    //Endpoint pour afficher nos livres 
    @GetMapping
    public ResponseEntity<?> getAllLivres() {
        List<Livre> livres = livreRepository.findAll();
        
        // On construit une réponse enrichie avec la disponibilité
        List<Map<String, Object>> livresAvecDisponibilite = livres.stream().map(livre -> {
        Map<String, Object> livreMap = new HashMap<>();
        livreMap.put("id", livre.getId());
        livreMap.put("titre", livre.getTitre());
        livreMap.put("auteur", livre.getAuteur());
        livreMap.put("isbn", livre.getIsbn());
        livreMap.put("categorie", livre.getCategorie());
        livreMap.put("anneePublication", livre.getAnneePublication());
        livreMap.put("maisonEdition", livre.getMaisonEdition());
        livreMap.put("imageCouverture", livre.getImageCouverture());


        // On compte les exemplaires où disponibilite == true
        List<Map<String, Object>> exemplaires = livre.getExemplaires().stream()
            .map(ex -> {
                Map<String, Object> exMap = new HashMap<>();
                exMap.put("id", ex.getId());
                exMap.put("codeBarre", ex.getCodeBarre());
                exMap.put("etat", ex.getEtat());
                exMap.put("disponibilite", ex.isDisponibilite());
                return exMap;
            })
            .collect(Collectors.toList());
        
        livreMap.put("exemplaires", exemplaires);
        livreMap.put("disponibilite", livre.getExemplaires().stream()
            .filter(Exemplaire::isDisponibilite).count());
            
        return livreMap;
    }).collect(Collectors.toList());

    return ResponseEntity.ok(livresAvecDisponibilite);
    }

    //Endpoint pour récupérer un livre par son ID 
    @GetMapping("/{id}")
    public ResponseEntity<?> getLivreById(@PathVariable Long id) {
        return livreRepository.findById(id)
            .map(livre -> {
                Map<String, Object> livreMap = new HashMap<>();
                livreMap.put("id", livre.getId());
                livreMap.put("titre", livre.getTitre());
                livreMap.put("auteur", livre.getAuteur());
                livreMap.put("isbn", livre.getIsbn());
                livreMap.put("categorie", livre.getCategorie());
                livreMap.put("anneePublication", livre.getAnneePublication());
                livreMap.put("maisonEdition", livre.getMaisonEdition());
                livreMap.put("imageCouverture", livre.getImageCouverture());
                return ResponseEntity.ok(livreMap);
            })
            .orElse(ResponseEntity.notFound().build());
    }
    

    //Pour Afficher les images 
    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.status(500).build();
        }
    }


    //Endpoint pour Modifier un livre
    @PutMapping("/{id}")
    public ResponseEntity<?> modifierLivre(
        @PathVariable Long id,
        @RequestParam String titre,
        @RequestParam String auteur,
        @RequestParam String isbn,
        @RequestParam String categorie,
        @RequestParam int anneePublication,
        @RequestParam String maisonEdition,
        @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) {
        return livreRepository.findById(id).map(livre -> {
        try {
            livre.setTitre(titre);
            livre.setAuteur(auteur);
            livre.setIsbn(isbn);
            livre.setCategorie(categorie);
            livre.setAnneePublication(anneePublication);
            livre.setMaisonEdition(maisonEdition);

            if (imageFile != null && !imageFile.isEmpty()) {
                // Supprimer l'ancienne image si tu veux (facultatif)
                String oldImagePath = UPLOAD_DIR + livre.getImageCouverture();
                Files.deleteIfExists(Paths.get(oldImagePath));

                // Enregistrer la nouvelle image
                String filename = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
                Path imagePath = Paths.get(UPLOAD_DIR, filename);
                Files.copy(imageFile.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
                livre.setImageCouverture(filename);
            }

            livreRepository.save(livre);
            return ResponseEntity.ok().body(livre);

            } catch (IOException e) {
                return ResponseEntity.status(500).body("Erreur lors de la mise à jour de l'image.");
            }
        }).orElse(ResponseEntity.notFound().build());
    }


    //Endpoint pour Supprimer un livre 
    @DeleteMapping("/{id}")
    public ResponseEntity<?> supprimerLivre(@PathVariable Long id) {
        return livreRepository.findById(id)
            .map(livre -> {
                livreRepository.delete(livre);
                return ResponseEntity.ok().body("Livre et ses exemplaires supprimés avec succès.");
            })
        .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
