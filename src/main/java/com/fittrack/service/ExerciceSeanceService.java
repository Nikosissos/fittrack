package com.fittrack.service;

import com.fittrack.model.ExerciceSeance;
import com.fittrack.repository.ExerciceSeanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import com.fittrack.dto.ProgressionResponse;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExerciceSeanceService {

    private final ExerciceSeanceRepository exerciceSeanceRepository;

    public List<ExerciceSeance> getExercicesBySeance(Long seanceId) {
        return exerciceSeanceRepository.findBySeanceId(seanceId);
    }

    public ExerciceSeance ajouterExercice(ExerciceSeance exercice) {
        return exerciceSeanceRepository.save(exercice);
    }

    public ExerciceSeance modifierExercice(Long id, ExerciceSeance données) {
        ExerciceSeance existing = exerciceSeanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercice non trouvé"));
        existing.setNom(données.getNom());
        existing.setSeries(données.getSeries());
        existing.setRepetitions(données.getRepetitions());
        existing.setPoids(données.getPoids());
        return exerciceSeanceRepository.save(existing);
    }

    public List<ProgressionResponse> getProgression(String nom, Long utilisateurId) {
        return exerciceSeanceRepository.findProgressionByNom(nom, utilisateurId)
            .stream()
            .map(e -> new ProgressionResponse(
                e.getSeance().getDate(),
                e.getSeries(),
                e.getRepetitions(),
                e.getPoids()
            ))
            .collect(Collectors.toList());
    }

    public void supprimerExercice(Long id) {
        exerciceSeanceRepository.deleteById(id);
    }
}
