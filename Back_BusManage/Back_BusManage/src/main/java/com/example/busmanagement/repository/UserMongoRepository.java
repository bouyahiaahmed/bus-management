package com.example.busmanagement.repository;

import com.example.busmanagement.model.Role;
import com.example.busmanagement.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMongoRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
}
