package com.fittrack.repository;

import com.fittrack.model.ExerciceSeance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExerciceSeanceRepository extends JpaRepository<ExerciceSeance, Long> {
    List<ExerciceSeance> findBySeanceId(Long seanceId);
}