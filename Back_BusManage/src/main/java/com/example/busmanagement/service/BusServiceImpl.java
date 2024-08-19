package com.example.busmanagement.service;

import com.example.busmanagement.model.Bus;
import com.example.busmanagement.model.Role;
import com.example.busmanagement.model.User;
import com.example.busmanagement.repository.BusRepository;
import com.example.busmanagement.repository.UserMongoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BusServiceImpl implements BusService{

    private final BusRepository busRepository;
    private final UserMongoRepository userMongoRepository;
    @Override
    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    @Override
    public Bus getBusById(String id) {
        return busRepository.findById(id).orElse(null);
    }

    @Override
    public Bus saveBus(Bus bus) {
        return busRepository.save(bus);
    }

    @Override
    public void deleteBus(String id) {
       busRepository.deleteById(id);
    }

    @Override
    public Bus updateBus(String id, Bus bus) {
        busRepository.findById(id).ifPresent(bus1 -> {
            bus1.setBusNumber(bus.getBusNumber());
            bus1.setMaxSeats(bus.getMaxSeats());
            bus1.setState(bus.isState());
            busRepository.save(bus1);
        });
        return bus;
    }


    @Override
    public Bus changeState(String id) {
        Bus bus = busRepository.findById(id).orElse(null);
        if(bus == null){
            throw new IllegalArgumentException("Bus not found");
        }
        bus.setState(!bus.isState());
        busRepository.save(bus);
        return bus;
    }


    @Override
    public void updateBusDriver(String busId, String currentDriverId, String startingDestination, String departureDate, String departureTime) {
        // Retrieve the bus from the database
        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        // Update the bus details
        bus.setCurrentDriver(userMongoRepository.findById(currentDriverId)
                .orElseThrow(() -> new RuntimeException("Driver not found")));
        bus.setStarting_destination(startingDestination);
        bus.setDepartureDate(departureDate); // Assuming setter exists
        bus.setDepartureTime(departureTime); // Assuming setter exists

        // Save the updated bus
        busRepository.save(bus);
    }
    public boolean reserveSeat(String busId, User user) {
        // Find the bus by its ID
        Bus bus = busRepository.findById(busId).orElse(null);

        if (bus == null) {
            // Bus not found
            return false;
        }

        // Check if the user has already reserved a seat
        if (bus.getPassengers() != null && bus.getPassengers().contains(user)) {
            // User has already reserved a seat
            return false; // Or return a specific message or status
        }

        // Check if there are available seats
        if (bus.getReservedSeats() >= bus.getMaxSeats()) {
            // No available seats
            return false;
        }

        // Increment the reserved seats
        bus.setReservedSeats(bus.getReservedSeats() + 1);

        // Add the user to the list of passengers
        if (bus.getPassengers() == null) {
            bus.setPassengers(new ArrayList<>());
        }
        bus.getPassengers().add(user);

        // Save the updated bus object
        busRepository.save(bus);

        return true;
    }
    public boolean removeAllPassengers(String busId) {
        // Find the bus by its ID
        Bus bus = busRepository.findById(busId).orElse(null);

        if (bus == null) {
            // Bus not found
            return false;
        }

        // Clear the list of passengers
        bus.setPassengers(new ArrayList<>());
        bus.setReservedSeats(0);

        // Save the updated bus object
        busRepository.save(bus);

        return true;
    }
}
