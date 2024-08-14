package com.example.busmanagement.service;

import com.example.busmanagement.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(String id);
    void deleteUser(String id);
    User saveUser(User user);
    User updateUser(User user);
    User assigncred(User user);
}
