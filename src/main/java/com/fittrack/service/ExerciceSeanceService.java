package com.fittrack.service;

import com.fittrack.model.ExerciceSeance;
import com.fittrack.repository.ExerciceSeanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

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

    public void supprimerExercice(Long id) {
        exerciceSeanceRepository.deleteById(id);
    }
}
