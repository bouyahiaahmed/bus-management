package com.example.busmanagement.service;

import com.example.busmanagement.Dto.CredentialsDto;
import com.example.busmanagement.Dto.UserDto;
import com.example.busmanagement.exceptions.AppException;
import com.example.busmanagement.mapper.UserMapper;
import com.example.busmanagement.model.Role;
import com.example.busmanagement.model.User;
import com.example.busmanagement.repository.UserMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMongoRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private  UserMapper userMapper;




    @Override
    public User saveUser(User user) {
        validateUser(user);
        encodePassword(user);
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        User existingUser = userRepository.findById(user.getId()).orElseThrow(() ->
                new IllegalArgumentException("User not found"));

        // Update fields
        if (user.getFirstName() != null) existingUser.setFirstName(user.getFirstName());
        if (user.getLastName() != null) existingUser.setLastName(user.getLastName());
        if (user.getEmail() != null) existingUser.setEmail(user.getEmail());
        if (user.getPhoneNumber() != 0) existingUser.setPhoneNumber(user.getPhoneNumber());
        if (user.getSex() != null) existingUser.setSex(user.getSex());
        if (user.getRole() != null) existingUser.setRole(user.getRole());

        // Check and encode password if changed
        if (user.getPassword() != null && !passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        return userRepository.save(existingUser);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    private void validateUser(User user) {
        if (user.getPassword() == null) {
            throw new IllegalArgumentException("Password cannot be null");
        }
        // Add more validations as needed
    }

    private void encodePassword(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
    }
    public User assigncred(User user) {
        // Ensure the user exists and only update necessary fields
        User existingUser = userRepository.findById(user.getId()).orElseThrow(() ->
                new IllegalArgumentException("User not found"));

        // Update only the username
        if (user.getUsername() != null) {
            existingUser.setUsername(user.getUsername());
        }
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            // Encode the password if it's different and in plain text
            if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
            }
        }

        existingUser.setAssignedcredentials(true);

        // Save the updated user back to the database
        return userRepository.save(existingUser);
    }
    public UserDto findByLogin(String login) {
        User user = userRepository.findByUsername(login);
        return userMapper.toUserDto(user);
    }

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByUsername(credentialsDto.login());

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.password()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus
                .BAD_REQUEST);
    }
    @Override
    public List<User> findByRole(Role role) {
        return userRepository.findByRole(role);
    }
}
