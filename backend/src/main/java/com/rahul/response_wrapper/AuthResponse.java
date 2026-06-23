package com.rahul.response_wrapper;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String role;
    private String email;
    private String name;
    private Long userId;
    private String phone;
}