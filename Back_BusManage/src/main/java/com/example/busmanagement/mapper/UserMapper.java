package com.example.busmanagement.mapper;

import com.example.busmanagement.Dto.UserDto;
import com.example.busmanagement.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDto(User user);
}
