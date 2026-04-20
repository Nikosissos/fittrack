package com.fittrack.service;

import com.fittrack.dto.AuthRequest;
import com.fittrack.dto.AuthResponse;
import com.fittrack.dto.UtilisateurRequest;
import com.fittrack.dto.UtilisateurResponse;
import com.fittrack.model.Utilisateur;
import com.fittrack.repository.UtilisateurRepository;
import com.fittrack.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UtilisateurRepository utilisateurRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public UtilisateurResponse register(UtilisateurRequest request) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail(request.getEmail());
        utilisateur.setMotDePasse(passwordEncoder.encode(request.getMotDePasse()));
        utilisateur.setPrenom(request.getPrenom());

        Utilisateur sauvegarde = utilisateurRepository.save(utilisateur);

        UtilisateurResponse response = new UtilisateurResponse();
        response.setId(sauvegarde.getId());
        response.setEmail(sauvegarde.getEmail());
        response.setPrenom(sauvegarde.getPrenom());
        return response;
    }

    public AuthResponse login(AuthRequest request) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Email ou mot de passe incorrect"));

        if (!passwordEncoder.matches(request.getMotDePasse(), utilisateur.getMotDePasse())) {
            throw new RuntimeException("Email ou mot de passe incorrect");
        }

        String token = jwtService.genererToken(utilisateur.getEmail());
        return new AuthResponse(utilisateur.getId(), token, utilisateur.getEmail(), utilisateur.getPrenom());
    }
}