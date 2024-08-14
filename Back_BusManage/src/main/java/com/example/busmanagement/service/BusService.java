package com.example.busmanagement.service;

import com.example.busmanagement.model.Bus;
import com.example.busmanagement.model.Role;
import com.example.busmanagement.model.User;

import java.util.List;

public interface BusService {
    public List<Bus> getAllBuses();
    public Bus getBusById(String id);
    public Bus saveBus(Bus bus);
    public void deleteBus(String id);
    public Bus updateBus(String id, Bus bus);
    Bus addDriver(String id, String userId);
    Bus removeDriver(String id, String userId);
    public Bus changeState(String id);
    public List<Bus> getBusesByDriver(String driverId);
    public List<Bus> getBusesByDriverName(String driverName);
    public List<Bus> getBusesByDriverLastName(String driverLastName);
    public List<Bus> getBusesByDriverEmail(String driverEmail);
    public List<Bus> getBusesByDriverPhoneNumber(int driverPhoneNumber);
    public List<Bus> getBusesByDriverAge(int driverAge);
    public List<Bus> getBusesByDriverSex(String driverSex);
    public List<Bus> getBusesByDriverRole(Role driverRole);
    public List<Bus> getBusesByDriverUsername(String driverUsername);
    public List<Bus> getBusesByDriverPassword(String driverPassword);
    public List<Bus> getBusesByBusNumber(String busNumber);
    public List<Bus> getBusesByMaxSeats(int maxSeats);
    public List<Bus> getBusesByPlate(String plate);
    public List<Bus> getBusesByState(boolean state);
}
