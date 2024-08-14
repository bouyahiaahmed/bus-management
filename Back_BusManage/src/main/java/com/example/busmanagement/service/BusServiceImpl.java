package com.example.busmanagement.service;

import com.example.busmanagement.model.Bus;
import com.example.busmanagement.model.Role;
import com.example.busmanagement.model.User;
import com.example.busmanagement.repository.BusRepository;
import com.example.busmanagement.repository.UserMongoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
            bus1.setPlate(bus.getPlate());
            bus1.setState(bus.isState());
            bus1.setDrivers(bus.getDrivers());
            busRepository.save(bus1);
        });
        return bus;
    }

    @Override
    public Bus addDriver(String id, String userId) {
        User driver = userMongoRepository.findById(userId).orElse(null);
        Bus bus = busRepository.findById(id).orElse(null);
        if(driver == null || bus == null){
            throw new IllegalArgumentException("Driver or Bus not found");
        }
        if(driver.getRole().equals(Role.DRIVER)){
            bus.getDrivers().add(driver);
            busRepository.save(bus);
            }
        return bus;
    }

    @Override
    public Bus removeDriver(String id, String userId) {
        User driver = userMongoRepository.findById(userId).orElse(null);
        Bus bus = busRepository.findById(id).orElse(null);
        if(driver == null || bus == null){
            throw new IllegalArgumentException("Driver or Bus not found");
        }
        if(driver.getRole().equals(Role.DRIVER)){
            bus.getDrivers().remove(driver);
            busRepository.save(bus);
        }
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
    public List<Bus> getBusesByDriver(String driverId) {
        return List.of();
    }

    @Override
    public List<Bus> getBusesByDriverName(String driverName) {
        return List.of();
    }

    @Override
    public List<Bus> getBusesByDriverLastName(String driverLastName) {
        return List.of();
    }

    @Override
    public List<Bus> getBusesByDriverEmail(String driverEmail) {
        return List.of();
    }

    @Override
    public List<Bus> getBusesByDriverPhoneNumber(int driverPhoneNumber) {
        return List.of();
    }

    @Override
    public List<Bus> getBusesByDriverAge(int driverAge) {
        return List.of();
    }

    @Override
    public List<Bus> getBusesByDriverSex(String driverSex) {
        return List.of();
    }

    @Override
    public List<Bus> getBusesByDriverRole(Role driverRole) {
        return List.of();
    }

    @Override
    public List<Bus> getBusesByDriverUsername(String driverUsername) {
        return List.of();
    }

    @Override
    public List<Bus> getBusesByDriverPassword(String driverPassword) {
        return List.of();
    }

    @Override
    public List<Bus> getBusesByBusNumber(String busNumber) {
        return List.of();
    }

    @Override
    public List<Bus> getBusesByMaxSeats(int maxSeats) {
        return List.of();
    }

    @Override
    public List<Bus> getBusesByPlate(String plate) {
        return List.of();
    }

    @Override
    public List<Bus> getBusesByState(boolean state) {
        return List.of();
    }
}
