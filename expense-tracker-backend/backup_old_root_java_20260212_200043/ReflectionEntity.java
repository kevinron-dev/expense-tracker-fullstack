package com.example.expense_tracker;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class ReflectionEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int reflectionId;
	private String rating;
	private String note;
	
	@OneToOne
	@JoinColumn(name = "expense_id")
	private ExpenseEntity expense;

}
