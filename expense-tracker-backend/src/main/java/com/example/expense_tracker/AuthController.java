package com.example.expense_tracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        UserEntity user = authService.register(request.getEmail(), request.getPassword());
        AuthResponse response = new AuthResponse(
            user.getUserId(),
            user.getEmail(),
            authService.generateToken(user)
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        UserEntity user = authService.login(request.getEmail(), request.getPassword());
        AuthResponse response = new AuthResponse(
            user.getUserId(),
            user.getEmail(),
            authService.generateToken(user)
        );
        return ResponseEntity.ok(response);
    }
}
