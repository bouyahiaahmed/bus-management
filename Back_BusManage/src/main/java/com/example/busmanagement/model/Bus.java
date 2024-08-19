package com.example.busmanagement.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Document
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bus {
    @Id
    private String id;
    private String busNumber;
    private int maxSeats;
    private int reservedSeats;
    private String starting_destination;
    private User currentDriver;
    private boolean state;
    List<User> passengers;
    private String departureDate;
    private String departureTime;
}
