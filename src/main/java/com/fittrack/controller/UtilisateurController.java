package com.fittrack.controller;

import com.fittrack.model.Utilisateur;
import com.fittrack.service.UtilisateurService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/utilisateurs")
@RequiredArgsConstructor
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    @PostMapping
    public ResponseEntity<Utilisateur> creer(@RequestBody Utilisateur utilisateur) {
        return ResponseEntity.ok(utilisateurService.creerUtilisateur(utilisateur));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getById(@PathVariable Long id) {
        return ResponseEntity.ok(utilisateurService.getById(id));
    }
}
