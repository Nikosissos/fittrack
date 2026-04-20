package com.fittrack.service;

import com.fittrack.model.Utilisateur;
import com.fittrack.repository.UtilisateurRepository;
import com.fittrack.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;
import com.fittrack.dto.UtilisateurRequest;
import com.fittrack.dto.UtilisateurResponse;

@Service
@RequiredArgsConstructor
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    /*public Utilisateur creerUtilisateur(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }*/

    public UtilisateurResponse creerUtilisateur(UtilisateurRequest request) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail(request.getEmail());
        utilisateur.setMotDePasse(request.getMotDePasse()); // sera hashé plus tard avec JWT
        utilisateur.setPrenom(request.getPrenom());

        Utilisateur sauvegarde = utilisateurRepository.save(utilisateur);

        UtilisateurResponse response = new UtilisateurResponse();
        response.setId(sauvegarde.getId());
        response.setEmail(sauvegarde.getEmail());
        response.setPrenom(sauvegarde.getPrenom());
        return response;
    }

    public Utilisateur modifierUtilisateur(Long id, Utilisateur utilisateur) {
        Utilisateur existant = utilisateurRepository.findById(id)
                //.orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé avec l'id : " + id));
        existant.setPrenom(utilisateur.getPrenom());
        existant.setEmail(utilisateur.getEmail());
        return utilisateurRepository.save(existant);
    }

    public void supprimerUtilisateur(Long id) {
        utilisateurRepository.deleteById(id);
    }

    public Optional<Utilisateur> getByEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }

    public Utilisateur getById(Long id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }
}
