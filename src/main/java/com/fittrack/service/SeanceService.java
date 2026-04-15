package com.fittrack.service;

import com.fittrack.model.Seance;
import com.fittrack.repository.SeanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SeanceService {

    private final SeanceRepository seanceRepository;

    public List<Seance> getSeancesByUtilisateur(Long utilisateurId) {
        return seanceRepository.findByUtilisateurId(utilisateurId);
    }

    public Seance creerSeance(Seance seance) {
        return seanceRepository.save(seance);
    }

    public Seance getSeanceById(Long id) {
        return seanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Séance non trouvée"));
    }

    public void supprimerSeance(Long id) {
        seanceRepository.deleteById(id);
    }
}
