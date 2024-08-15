package com.example.busmanagement.Dto;

import com.example.busmanagement.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private int phoneNumber;
    private int age;
    private String sex;
    private Role role;
    private String username;
    private String password;
    private boolean assignedcredentials;
    private String token;
}
