package com.example.expense_tracker;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reflections")
public class ReflectionController {

	@Autowired
	private ReflectionService reflectionService;

	@GetMapping("/user/{userId}")
	public List<ReflectionResponse> getReflectionsByUser(@PathVariable Long userId) {
		List<ReflectionEntity> reflections = reflectionService.getReflectionsByUser(userId);
		List<ReflectionResponse> response = new ArrayList<>();
		for (ReflectionEntity reflection : reflections) {
			response.add(reflectionService.toResponse(reflection));
		}
		return response;
	}

	@PostMapping
	public ResponseEntity<ReflectionResponse> upsertReflection(@RequestBody ReflectionRequest request) {
		ReflectionEntity saved = reflectionService.upsertReflection(request);
		return ResponseEntity.ok(reflectionService.toResponse(saved));
	}
}
