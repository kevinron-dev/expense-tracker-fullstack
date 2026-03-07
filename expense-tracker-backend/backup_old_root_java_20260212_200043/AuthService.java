package com.example.expense_tracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
	
	@Autowired
	private UserRepo userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public UserEntity register(String email, String password) {
		if(userRepository.findByEmail(email) != null) {
			throw new RuntimeException("Email already exists");
		}
		UserEntity user = new UserEntity();
		user.setEmail(email);
		user.setPassword( passwordEncoder.encode(password));
		
		return userRepository.save(user);
	}
	
	public UserEntity login(String email, String password) {
		UserEntity user = userRepository.findByEmail(email);
		
		if(user == null || !passwordEncoder.matches(password, user.getPassword())) {
			throw new RuntimeException("Invalid credentials");
			
		}
		
		return user;
	}

}
