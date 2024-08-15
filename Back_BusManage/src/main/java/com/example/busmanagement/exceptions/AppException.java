package com.example.busmanagement.exceptions;

import org.springframework.http.HttpStatus;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AppException extends RuntimeException {
    private final HttpStatus httpStatus;

    public AppException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
