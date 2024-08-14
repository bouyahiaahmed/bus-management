package com.example.busmanagement.repository;

import com.example.busmanagement.model.Bus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface BusRepository extends MongoRepository<Bus,String> {



}
