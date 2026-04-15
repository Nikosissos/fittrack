package com.fittrack.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "exercices_seance")
public class ExerciceSeance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private int series;

    @Column(nullable = false)
    private int repetitions;

    @Column(nullable = false)
    private double poids;

    @ManyToOne
    @JoinColumn(name = "seance_id", nullable = false)
    private Seance seance;
}