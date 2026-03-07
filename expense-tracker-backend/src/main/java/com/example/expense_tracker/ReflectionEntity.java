package com.example.expense_tracker;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ReflectionEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int reflectionId;
	private String rating;
	private String note;
	
	@ManyToOne
	@JoinColumn(name = "expense_id")
	private ExpenseEntity expense;

	public int getReflectionId() {
		return reflectionId;
	}

	public void setReflectionId(int reflectionId) {
		this.reflectionId = reflectionId;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public ExpenseEntity getExpense() {
		return expense;
	}

	public void setExpense(ExpenseEntity expense) {
		this.expense = expense;
	}

}
