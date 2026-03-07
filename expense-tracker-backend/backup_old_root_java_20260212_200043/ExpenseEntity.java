package com.example.expense_tracker;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ExpenseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int expenseId;
	private double amount;
	private String category;
	private String paymentMode;
	private LocalDate expenseDate;
	private String description;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserEntity user;

}
