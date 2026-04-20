package com.fittrack;

import com.fittrack.exception.ResourceNotFoundException;
import com.fittrack.model.ExerciceSeance;
import com.fittrack.model.Seance;
import com.fittrack.repository.ExerciceSeanceRepository;
import com.fittrack.repository.SeanceRepository;
import com.fittrack.service.SeanceService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SeanceServiceTest {

    @Mock
    private SeanceRepository seanceRepository;

    @Mock
    private ExerciceSeanceRepository exerciceSeanceRepository;

    @InjectMocks
    private SeanceService seanceService;

    @Test
    void calculerVolume_retourneLaBonneSomme() {
        // GIVEN — prépare les données
        Long seanceId = 1L;
        when(seanceRepository.existsById(seanceId)).thenReturn(true);

        ExerciceSeance squat = new ExerciceSeance();
        squat.setSeries(4);
        squat.setRepetitions(8);
        squat.setPoids(80.0);

        ExerciceSeance developpe = new ExerciceSeance();
        developpe.setSeries(3);
        developpe.setRepetitions(10);
        developpe.setPoids(60.0);

        when(exerciceSeanceRepository.findBySeanceId(seanceId))
            .thenReturn(List.of(squat, developpe));

        // WHEN — exécute la méthode à tester
        double volume = seanceService.calculerVolume(seanceId);

        // THEN — vérifie le résultat
        // squat: 4 x 8 x 80 = 2560
        // developpe: 3 x 10 x 60 = 1800
        // total = 4360
        assertEquals(4360.0, volume);
    }

    @Test
    void calculerVolume_lanceExceptionSiSeanceInexistante() {
        // GIVEN
        Long seanceId = 999L;
        when(seanceRepository.existsById(seanceId)).thenReturn(false);

        // WHEN + THEN — vérifie que l'exception est bien lancée
        assertThrows(ResourceNotFoundException.class, () -> {
            seanceService.calculerVolume(seanceId);
        });
    }

    @Test
    void getSeanceById_retourneLaSeance() {
        // GIVEN
        Long seanceId = 1L;
        Seance seance = new Seance();
        seance.setId(seanceId);
        seance.setNom("Push du lundi");

        when(seanceRepository.findById(seanceId)).thenReturn(Optional.of(seance));

        // WHEN
        Seance result = seanceService.getSeanceById(seanceId);

        // THEN
        assertEquals("Push du lundi", result.getNom());
        assertEquals(seanceId, result.getId());
    }
}