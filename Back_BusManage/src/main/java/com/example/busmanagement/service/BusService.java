package com.example.busmanagement.service;

import com.example.busmanagement.model.Bus;

import java.util.List;

public interface BusService {
    public List<Bus> getAllBuses();
    public Bus getBusById(String id);
    public Bus saveBus(Bus bus);
    public void deleteBus(String id);
    public Bus updateBus(String id, Bus bus);
    public Bus changeState(String id);
    public void updateBusDriver(String busId, String currentDriverId, String startingDestination);

}
