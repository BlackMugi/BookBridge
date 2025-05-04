package sn.edu.bookbridge.restfull.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import sn.edu.bookbridge.restfull.model.Utilisateur;

import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "bookbridgeSecretKey";

    
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    public String generateToken(Utilisateur utilisateur) {
        return Jwts.builder()
                .setSubject(utilisateur.getEmail())
                .claim("role", utilisateur.getRole())
                .claim("nom", utilisateur.getNom())
                .claim("prenom", utilisateur.getPrenom())
                .claim("id", utilisateur.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

}
