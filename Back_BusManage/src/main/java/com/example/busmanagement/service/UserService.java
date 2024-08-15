package com.example.busmanagement.service;

import com.example.busmanagement.Dto.CredentialsDto;
import com.example.busmanagement.Dto.UserDto;
import com.example.busmanagement.model.Role;
import com.example.busmanagement.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(String id);
    void deleteUser(String id);
    User saveUser(User user);
    User updateUser(User user);
    UserDto findByLogin(String login);
    User assigncred(User user);
    UserDto login(CredentialsDto credentialsDto);
    List<User> findByRole(Role role);
}
