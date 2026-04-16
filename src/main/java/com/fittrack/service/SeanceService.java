package com.fittrack.service;

import com.fittrack.model.Seance;
import com.fittrack.model.ExerciceSeance;
import com.fittrack.repository.SeanceRepository;
import com.fittrack.repository.ExerciceSeanceRepository;
import com.fittrack.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SeanceService {

    private final SeanceRepository seanceRepository;
    private final ExerciceSeanceRepository exerciceSeanceRepository;

    public List<Seance> getSeancesByUtilisateur(Long utilisateurId) {
        return seanceRepository.findByUtilisateurId(utilisateurId);
    }

    public Seance creerSeance(Seance seance) {
        return seanceRepository.save(seance);
    }

    public Seance getSeanceById(Long id) {
        return seanceRepository.findById(id)
                //.orElseThrow(() -> new RuntimeException("Séance non trouvée"));
                .orElseThrow(() -> new ResourceNotFoundException("Séance non trouvée avec l'id : " + id));
    }

    public void supprimerSeance(Long id) {
        seanceRepository.deleteById(id);
    }

    public double calculerVolume(Long seanceId) {
        List<ExerciceSeance> exercices = exerciceSeanceRepository.findBySeanceId(seanceId);
        /*int volume = 0;
        for (ExerciceSeance exercice : exercices) {
            volume += exercice.getSeries() * exercice.getRepetitions() * exercice.getPoids();
        }
        return volume;*/
        if (!seanceRepository.existsById(seanceId)) {
            throw new ResourceNotFoundException("Séance non trouvée avec l'id : " + seanceId);
        }

        return exercices.stream()
            .mapToDouble(e -> e.getSeries() * e.getRepetitions() * e.getPoids())
            .sum();
    }
}
