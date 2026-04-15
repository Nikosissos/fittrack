package com.fittrack.controller;

import com.fittrack.model.ExerciceSeance;
import com.fittrack.service.ExerciceSeanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercices")
@RequiredArgsConstructor
public class ExerciceSeanceController {

    private final ExerciceSeanceService exerciceSeanceService;

    @GetMapping
    public ResponseEntity<List<ExerciceSeance>> getBySeance(@RequestParam Long seanceId) {
        return ResponseEntity.ok(exerciceSeanceService.getExercicesBySeance(seanceId));
    }

    @PostMapping
    public ResponseEntity<ExerciceSeance> ajouter(@RequestBody ExerciceSeance exercice) {
        return ResponseEntity.ok(exerciceSeanceService.ajouterExercice(exercice));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExerciceSeance> modifier(@PathVariable Long id, @RequestBody ExerciceSeance données) {
        return ResponseEntity.ok(exerciceSeanceService.modifierExercice(id, données));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimer(@PathVariable Long id) {
        exerciceSeanceService.supprimerExercice(id);
        return ResponseEntity.noContent().build();
    }
}
