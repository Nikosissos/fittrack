package com.fittrack.controller;

import com.fittrack.model.Seance;
import com.fittrack.service.SeanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seances")
@RequiredArgsConstructor
public class SeanceController {

    private final SeanceService seanceService;

    @GetMapping
    public ResponseEntity<List<Seance>> getByUtilisateur(@RequestParam Long utilisateurId) {
        return ResponseEntity.ok(seanceService.getSeancesByUtilisateur(utilisateurId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seance> getById(@PathVariable Long id) {
        return ResponseEntity.ok(seanceService.getSeanceById(id));
    }

    @PostMapping
    public ResponseEntity<Seance> creer(@RequestBody Seance seance) {
        return ResponseEntity.ok(seanceService.creerSeance(seance));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimer(@PathVariable Long id) {
        seanceService.supprimerSeance(id);
        return ResponseEntity.noContent().build();
    }
}
