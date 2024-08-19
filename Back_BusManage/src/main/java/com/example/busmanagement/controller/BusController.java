package com.example.busmanagement.controller;

import com.example.busmanagement.model.Bus;
import com.example.busmanagement.model.User;
import com.example.busmanagement.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http=://localhost::4200")
@RestController
@RequestMapping("/bus")
public class BusController {
    @Autowired
    private BusService busService;

    @GetMapping("/list")
    public ResponseEntity<List<Bus>> getAllBuses() {
        List<Bus> buses = busService.getAllBuses();
        return ResponseEntity.ok(buses);
    }
    @PostMapping("/addbus")
    public ResponseEntity<Bus> saveBus(@RequestBody Bus bus) {
        Bus savedBus = busService.saveBus(bus);
        return ResponseEntity.ok(savedBus);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteBus(@PathVariable String id) {
        busService.deleteBus(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Bus deleted successfully");
        return ResponseEntity.ok(response);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Bus> updateBus(@PathVariable String id, @RequestBody Bus bus) {
        Bus updatedBus = busService.updateBus(id, bus);
        if (updatedBus != null) {
            return ResponseEntity.ok(updatedBus);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/assign-driver/{busId}/{currentDriverId}/{startingDestination}/{departureDate}/{departureTime}")
    public ResponseEntity<String> assignDriver(
            @PathVariable("busId") String busId,
            @PathVariable("currentDriverId") String currentDriverId,
            @PathVariable("startingDestination") String startingDestination,
            @PathVariable("departureDate") String departureDate,
            @PathVariable("departureTime") String departureTime) {
        try {
            // Call the service to update the bus with the new driver and starting destination
            busService.updateBusDriver(busId, currentDriverId, startingDestination, departureDate, departureTime);
            return ResponseEntity.ok("Bus updated successfully");
        } catch (Exception e) {
            // Handle exceptions (e.g., Bus not found, Driver not valid, etc.)
            return ResponseEntity.status(400).body("Error updating bus: " + e.getMessage());
        }
    }
    @PostMapping("/{busId}/reserve")
    public ResponseEntity<String> reserveSeat(@PathVariable String busId, @RequestBody User user) {
        boolean success = busService.reserveSeat(busId, user);

        if (success) {
            return new ResponseEntity<>("Seat reserved successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to reserve seat. Bus might be full or invalid data.", HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/{busId}/removeAllPassengers")
    public boolean removeAllPassengers(@PathVariable String busId) {
        return busService.removeAllPassengers(busId);
    }
}
