package com.fittrack.repository;

import com.fittrack.model.Seance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SeanceRepository extends JpaRepository<Seance, Long> {
    List<Seance> findByUtilisateurId(Long utilisateurId);
}