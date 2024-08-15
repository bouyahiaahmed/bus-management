package com.example.busmanagement.controller;

import com.example.busmanagement.Dto.CredentialsDto;
import com.example.busmanagement.Dto.UserDto;
import com.example.busmanagement.config.UserAuthProvider;
import com.example.busmanagement.model.Role;
import com.example.busmanagement.model.User;
import com.example.busmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin (origins = "http=://localhost::4200")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserAuthProvider userAuthProvider;

    @GetMapping("/list")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }
    @PostMapping("/add")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user) {
        User existingUser = userService.getUserById(id);
        if (existingUser != null) {
            existingUser.setUsername(user.getUsername());
            existingUser.setPassword(user.getPassword());
            return ResponseEntity.ok(userService.updateUser(existingUser));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/assign-credentials/{id}")
    public ResponseEntity<User> assignCredentials(@PathVariable String id, @RequestBody User user) {
        System.out.println(user);
        User existingUser = userService.getUserById(id);
        if (existingUser != null) {
            // Update username
            existingUser.setUsername(user.getUsername());

            // Check if the provided password is different from the existing password
            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                if (!user.getPassword().equals(existingUser.getPassword())) {
                    // Set the plain text password directly
                    existingUser.setPassword(user.getPassword());
                }
            }

            // Save the updated user
            User updatedUser = userService.assigncred(existingUser);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody CredentialsDto credentialsDto){
        UserDto user = userService.login(credentialsDto);
        user.setToken(userAuthProvider.createToken(user));
        return ResponseEntity.ok(user);
    }
    @GetMapping("/by-role/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable Role role) {
        List<User> users = userService.findByRole(role);
        if (users != null && !users.isEmpty()) {
            return ResponseEntity.ok(users);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
}
