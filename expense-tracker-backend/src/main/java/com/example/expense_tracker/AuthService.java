package com.example.expense_tracker;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
	
	@Autowired
	private UserRepo userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public UserEntity register(String email, String password) {
		if (email == null || email.isBlank() || password == null || password.isBlank()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and password are required");
		}

		if(userRepository.findByEmail(email) != null) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
		}
		UserEntity user = new UserEntity();
		user.setEmail(email);
		user.setPassword( passwordEncoder.encode(password));
		
		return userRepository.save(user);
	}
	
	public UserEntity login(String email, String password) {
		if (email == null || email.isBlank() || password == null || password.isBlank()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and password are required");
		}

		UserEntity user = userRepository.findByEmail(email);
		
		if(user == null || !passwordEncoder.matches(password, user.getPassword())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
			
		}
		
		return user;
	}

	public String generateToken(UserEntity user) {
		return "exp_" + user.getUserId() + "_" + UUID.randomUUID();
	}

}
