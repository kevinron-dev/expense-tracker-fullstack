package com.example.expense_tracker;

public class AuthResponse {
    private int userId;
    private String email;
    private String token;

    public AuthResponse() {
    }

    public AuthResponse(int userId, String email, String token) {
        this.userId = userId;
        this.email = email;
        this.token = token;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
