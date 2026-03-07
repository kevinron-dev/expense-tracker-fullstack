package com.example.expense_tracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public UserEntity register(@RequestBody UserEntity user) {
        return authService.register(user.getEmail(), user.getPassword());
    }

    @PostMapping("/login")
    public UserEntity login(@RequestBody UserEntity user) {
        return authService.login(user.getEmail(), user.getPassword());
    }
}