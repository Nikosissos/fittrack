package com.fittrack.repository;

import com.fittrack.model.ExerciceSeance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ExerciceSeanceRepository extends JpaRepository<ExerciceSeance, Long> {
    List<ExerciceSeance> findBySeanceId(Long seanceId);

    @Query("SELECT e FROM ExerciceSeance e JOIN e.seance s WHERE LOWER(e.nom) = LOWER(:nom) AND s.utilisateur.id = :utilisateurId ORDER BY s.date")
    List<ExerciceSeance> findProgressionByNom(@Param("nom") String nom, @Param("utilisateurId") Long utilisateurId);
}