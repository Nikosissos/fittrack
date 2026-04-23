package com.fittrack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ProgressionResponse {
    private LocalDate date;
    private int series;
    private int repetitions;
    private double poids;
}