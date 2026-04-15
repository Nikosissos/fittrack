package com.fittrack.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
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

    @JsonProperty(access = Access.WRITE_ONLY)
    @ManyToOne
    @JoinColumn(name = "seance_id", nullable = false)
    private Seance seance;
}